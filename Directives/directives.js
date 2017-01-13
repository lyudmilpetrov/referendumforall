bgr.directive('fileSelect', ['$window', '$http', 'globalVariables', 'ngDialog', 'getURLData', 'postURLData', function ($window, $http, globalVariables, ngDialog, getURLData, postURLData) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, el, attr, ctrl) {
            if ($window.File && $window.FileReader && $window.FileList && $window.Blob) {
                // Initilize local variables
                let initials = '';
                let reader = new $window.FileReader();
                let selectedFile = null;
                let maxBlockSize = 256 * 1024;//Each file will be split in 256 KB.
                let numberOfBlocks = 1;
                let currentFilePointer = 0;
                let totalBytesRemaining = 0;
                let blockIds = new Array();
                let blockIdPrefix = "block-";
                let submitUri = null;
                let bytesUploaded = 0;
                let fileSize = 0;
                let fileName;
                let fileType;
                let baseUrl;
                function handleFileSelect(e) {
                    baseUrl = scope.words.track.azr;
                    console.log(baseUrl)
                    blockIds = new Array();
                    initials = (scope.words.fieldsRefTitle.v + scope.words.fieldsRefEmail.v).toLowerCase();
                    maxBlockSize = 256 * 1024;
                    currentFilePointer = 0;
                    totalBytesRemaining = 0;
                    let files = e.target.files;
                    selectedFile = files[0];
                    let fileSize = selectedFile.size;
                    if (fileSize < maxBlockSize) {
                        maxBlockSize = fileSize;
                    }
                    totalBytesRemaining = fileSize;
                    if (fileSize % maxBlockSize == 0) {
                        numberOfBlocks = fileSize / maxBlockSize;
                    }
                    else {
                        numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
                    };
                    let indexOfQueryStart = baseUrl.indexOf("?");
                    submitUri = baseUrl.substring(0, indexOfQueryStart) + '/' + initials + '/' + selectedFile.name + baseUrl.substring(indexOfQueryStart);
                };
                reader.onloadend = function (evt) {
                    if (evt.target.readyState == FileReader.DONE) {
                        let uri = submitUri + '&comp=block&blockid=' + blockIds[blockIds.length - 1];
                        console.log(uri);
                        let requestData = new Uint8Array(evt.target.result);
                        function setHeader(xhr) {
                            xhr.setRequestHeader('x-ms-version', '2014-02-14');
                            xhr.setRequestHeader('MaxDataServiceVersion', '3.0');
                            xhr.setRequestHeader('Accept', 'application/json;odata=nometadata');
                        };
                        $.ajax({
                            url: uri,
                            type: "PUT",
                            data: requestData,
                            processData: false,
                            beforeSend: function (xhr) {
                                //xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                                //xhr.setRequestHeader('Content-Length', requestData.length);
                            },
                            success: function (data, status) {
                                bytesUploaded += requestData.length;
                                let percentComplete = ((parseFloat(bytesUploaded) / parseFloat(selectedFile.size)) * 100).toFixed(2);
                                uploadFileInBlocks();
                            },
                            error: function (xhr, desc, err) {
                                ////console.log(desc);
                                ////console.log(err);
                            }
                        });
                    };
                };
                function uploadFileInBlocks() {
                    if (totalBytesRemaining > 0) {
                        let fileContent = selectedFile.slice(currentFilePointer, currentFilePointer + maxBlockSize);
                        let blockId = blockIdPrefix + pad(blockIds.length, 6);
                        blockIds.push(btoa(blockId));
                        reader.readAsArrayBuffer(fileContent);
                        currentFilePointer += maxBlockSize;
                        totalBytesRemaining -= maxBlockSize;
                        if (totalBytesRemaining < maxBlockSize) {
                            maxBlockSize = totalBytesRemaining;
                        };
                    }
                    else {
                        commitBlockList();
                    };
                    ngDialog.close(ngDialog.getOpenDialogs()[0]);
                    scope.words.track.fileSaved = true;
                    scope.words.fieldsRefLoadedFile.s = true;
                    scope.words.fieldsRefLoadedFile.v = scope.words.abrv + scope.words.genericWords.strg + ':' + initials + ':' + selectedFile.name;
                    //console.log(scope.words.fieldsRefLoadedFile);

                };
                function commitBlockList() {
                    let uri = submitUri + '&comp=blocklist';
                    let requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
                    for (let i = 0; i < blockIds.length; i++) {
                        requestBody += '<Latest>' + blockIds[i] + '</Latest>';
                    };
                    requestBody += '</BlockList>';
                    $.ajax({
                        url: uri,
                        type: "PUT",
                        data: requestBody,
                        beforeSend: function (xhr) {
                            //xhr.setRequestHeader('x-ms-blob-content-type', selectedFile.type);
                            //xhr.setRequestHeader('Content-Length', requestBody.length);
                        },
                        success: function (data, status) {


                        },
                        error: function (xhr, desc, err) {
                            //console.log(xhr);
                            //console.log(desc);
                            //console.log(err);
                        }
                    });
                };
                function pad(number, length) {
                    let str = '' + number;
                    while (str.length < length) {
                        str = '0' + str;
                    }
                    return str;
                };
                function deleteFileNow() {
                    let d = {
                        container: scope.words.abrv + scope.words.genericWords.strg,
                        filename: initials + '/' + selectedFile.name
                    };
                    postURLData(globalVariables.getProperty(0, 'deleteAzureStorage').url, d, globalVariables.getProperty(0, 'deleteAzureStorage').contentType)
                        .then(function (response) {
                            ngDialog.close(ngDialog.getOpenDialogs()[0]);
                            scope.words.track.fileSaved = false;
                            scope.words.fieldsRefLoadedFile.s = false;
                            scope.words.fieldsRefLoadedFile.v = '';
                        })
                        .catch(function (error) {
                            console.log('works POST - ' + error);
                            ngDialog.close(ngDialog.getOpenDialogs()[0]);
                        });
                };
                scope.manageFileNow = function (e) {
                    if (e == 's') {
                        // Make a promise here
                        let p = new Promise(function (resolve, reject) {
                            if (!scope.words.track.fileSaved) {
                                ngDialog.open({
                                    template: '<center><p><img src="Images/l0.gif" alt="loading"> ' + scope.words.genericWords.loading + '</p></center>',
                                    plain: true,
                                    showClose: false,
                                    overlay: true,
                                    closeByDocument: true,
                                    closeByEscape: true,
                                    cache: false,
                                    trapFocus: false,
                                    preserveFocus: false
                                });
                                // success
                                resolve(uploadFileInBlocks());
                            };
                        });
                        p.then(function (result) {
                        }, function (err) {
                            // Error: "It broke"
                            $scope.words[key].c = 'e';
                        });
                    } else {
                        let p = new Promise(function (resolve, reject) {
                            ngDialog.open({
                                template: '<center><p><img src="Images/l0.gif" alt="loading"> ' + scope.words.genericWords.deleteing + '</p></center>',
                                plain: true,
                                showClose: false,
                                overlay: true,
                                closeByDocument: true,
                                closeByEscape: true,
                                cache: false,
                                trapFocus: false,
                                preserveFocus: false
                            });
                            resolve(deleteFileNow()); // success
                        });
                        p.then(function (result) {
                        }, function (err) {
                            // Error: "It broke"
                            $scope.words[key].c = 'e';
                        });
                    };
                };
                el.bind('change', function (e) {
                    if (typeof e.target.files[0] !== 'undefined') {
                        selectedFile = e.target.files[0];
                        let ft = attr['fileSelect'];
                        handleFileSelect(e);
                    };
                });
            } else {
                //Do nothing
            };

        }
    };
}]);