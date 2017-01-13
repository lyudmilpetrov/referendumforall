bgr.service('globalVariables', function () {
    let globalVariables = {};
    globalVariables.storage = {};
    globalVariables.storage.info = 'info';
    globalVariables.storage.name = 'person';
    globalVariables.storage.type = 'localStorage';
    globalVariables.person = {};
    globalVariables.person.firstName = '';
    globalVariables.person.lastName = '';
    globalVariables.person.email = '';
    globalVariables.person.phone = '';
    globalVariables.WebSocketCounter = 0;
    globalVariables.server = 'https://gdcapi.azurewebsites.net/';
    globalVariables.hub = '/signalr';
    globalVariables.api = 'api/Referendums';
    // replace with nation {usa, bg and so on}
    globalVariables.getReferendumsInfo = { url: globalVariables.server + globalVariables.api + '/replace', type: 'GET', contentType: 'application/json;charset=utf-8', data: '' };
    // replace with nation usa, bg and so on
    globalVariables.getStorage = { url: globalVariables.server + globalVariables.api + '/?option=replace&nation=replace', type: 'GET', contentType: 'application/json;charset=utf-8', data: '' };
    globalVariables.postReferendumsInfo = { url: globalVariables.server + globalVariables.api, type: 'POST', contentType: 'application/json;charset=utf-8', data: '' };
    // replace with Email, Phone or Confirm
    globalVariables.postCodeConfirm = { url: globalVariables.server + globalVariables.api + '?codeconfirm=replace', type: 'POST', contentType: 'application/json;charset=utf-8', data: '' };
    globalVariables.deleteAzureStorage = {
        url: globalVariables.server + globalVariables.api + '?nation=nation', type: 'POST', contentType: 'application/json;charset=utf-8', data: ''
    };
    return {
        getProperty: function (level, key0, key1) {
            if (level === 0) {
                return globalVariables[key0];
            } else {
                return globalVariables[key0][key1];
            };
        },
        setProperty: function (level, value, key0, key1) {
            if (level === 0) {
                globalVariables[key0] = value;
            } else {
                globalVariables[key0][key1] = value;
            };
        },
        getObject: function () {
            return globalVariables;
        }
    };
});
bgr.factory('getURLData', function () {
    return function (url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'GET',
                url: url
            }).done(resolve).fail(reject);
        });
    };
});
bgr.factory('postURLData', function () {
    return function (url, data, contentType) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                url: url,
                contentType: contentType,
            }).done(resolve).fail(reject);
        });
    };
});
bgr.factory('words', function () {
    var commonDataTimeOpen = 2500;
    var bg = {
        fieldsRefTitle: { f: 'Референдум заглавие', r: 'Моля въведете заглавие  на референдум', v: '', h: true, l: 6 },
        fieldsRefGoals: { f: 'Кратко описание на мотивите и целите на референдума', r: 'Моля кратко опишете мотивите и целите', v: '', h: true, l: 10 },
        fieldsRefFirstName: { f: 'Име', r: 'Моля въведете името си, ще бъде кодирано', v: '', h: true, l: 0 },
        fieldsRefLastName: { f: 'Фамилия', r: 'Моля въведете фамилията си, ще бъде кодирана', v: '', h: true, l: 0 },
        fieldsRefEmail: { f: 'Твоят емайл', r: 'Моля въведете емайл, ще бъде кодиран', v: '', h: true, t: 'e', s: false, l: 6 },
        fieldsRefPhone: { f: 'Твоят мобилен телефон', r: 'Моля въведете мобилен телефон, ще бъде кодиран', v: '', h: true, t: 's', s: false, l: 6 },
        fieldsRefEmailConfirm: { f: 'Въведи 4 цифрен код, изпратен на емаила Ви', r: 'Въведеният код не съвпада', v: '', h: true, c: false, l: 3 },
        fieldsRefPhoneConfirm: { f: 'Въведи 4 цифрен код, изпратен на телефона Ви', r: 'Въведеният код не съвпада', v: '', h: true, c: false, l: 3 },
        fieldsRefLoadedFile: { f: 'Избери файл', r: '', v: '', h: true, c: false, s: false },
        fileReferendum: { f: 'Зареден файл', h: true },
        registerRef: { f: 'Регистрирай референдум', r: false, h: true, ff: 'Изтрий референдум' },
        windowTimeOpen: commonDataTimeOpen,
        phoneExtension: '+359',
        country: 'bulgaria',
        abrv: 'bg',
        beggingCountry: 'Референдум - България',
        createRef: 'Нов референдум',
        //supportRef: 'Подкрепи референдум',
        supportRef: { f: 'Подкрепи референдум', r: false, h: true, ff: 'Отегли подкрепата си' },
        loadFile: { l: 'Зареди', s: 'Прикачи', r: 'Изтри', c: 'Промени' },
        genericWords: {
            invalidEmail: 'Веведи истински емайл', emailMe: 'Проблем със връзката моля оптитайте отново и ако видите това съобщение изпратете информацията на unitedallpeople@gmail.com и референдума ще бъде регистриран и/или подкрепен от ваше име', emailSupport: 'unitedallpeople@gmail.com', messageSMS: 'моля използвайте код - codereplace - за да потвърдите Вашият телефон', messageEmail: 'моля използвайте код - codereplace - за да потвърдите Вашият емайл', messageEmailSubject: 'Вашият емайл код', fieldLoadingFile: 'Прикачи файл', strg: 'referendum', loading: 'Запаметяване...', deleteing: 'Изтриване...', downloading: 'Изтегляне...', checking: 'Проверка...', emailCode: 'Въведеният емайл код не съвпада', phoneCode: 'Въведеният телефонен код не съвпада', emailphoneCode: 'Въведените кодове за емаил и телефон не съвпадат',
            refData: { Title: 'Заглавие', Desc: 'Описание', Supported: 'Подкрепили', Attach: 'Прикачен файл', AttachEmpty: 'Няма' },
            connecting: { waitconfirmcodes: 'Моля изчакайте проверка', waitloading: 'Моля изчакайте зареждане' }
        },
        title: 'Референдум за България',
        websocket: { supported: false, timing: 2000, counter: 0 },
        ariaBtn: { btnNewRef: 'Създай нов референдум', btnSupRef: 'Подкрепи референдум', btnNewRefRegRem: { reg: 'Регистрирай новият референдум', rem: 'Дерегистрирай референдумът' }, btnNewRefFinal: '' },
        offlineMessage: { id: 'offLineID', v: 'Моля изчакайте за интернет връзка' }
    };
    var engUSA = {
        fieldsRefTitle: { f: 'Referendum title', r: 'Please enter referendum title', v: '', h: true, l: 6 },
        fieldsRefGoals: { f: 'Short description of the goals and ideas for this referendum', r: 'Please shortly describe the goals and ideas for this referendum', v: '', h: true, l: 10 },
        fieldsRefFirstName: { f: 'First name', r: 'Please enter your first name, it will be encrypted', v: '', h: true, l: 0 },
        fieldsRefLastName: { f: 'Last name', r: 'Please enter your last name, it will be encrypted', v: '', h: true, l: 0 },
        fieldsRefEmail: { f: 'Your email', r: 'Please enter your email, it will be encrypted', v: '', h: true, t: 'e', s: false, l: 6 },
        fieldsRefPhone: { f: 'Your mobile phone', r: 'Please enter your mobile phone, it will be encrypted', v: '', h: true, t: 's', s: false, l: 6 },
        fieldsRefEmailConfirm: { f: 'Enter 4 digits code sent to email', r: 'Entered code does not match', v: '', h: true, c: false, l: 3 },
        fieldsRefPhoneConfirm: { f: 'Enter 4 digits code sent to phone', r: 'Entered code does not match', v: '', h: true, c: false, l: 3 },
        fieldsRefLoadedFile: { f: 'Upload a file', r: '', v: '', h: true, c: false, s: false },
        fileReferendum: { f: 'Upload file', h: true },
        registerRef: { f: 'Register referendum', r: false, h: true, ff: 'Remove referendum' },
        windowTimeOpen: commonDataTimeOpen,
        phoneExtension: '001',
        country: 'usa',
        abrv: 'usa',
        beggingCountry: 'Referendum - USA',
        createRef: 'New referendum',
        //supportRef: 'Support referendum',
        supportRef: { f: 'Support referendum', r: false, h: true, ff: 'Redraw support' },
        loadFile: { l: 'Load', s: 'Save', r: 'Remove', c: 'Change' },
        genericWords: {
            invalidEmail: 'You will neeed a real email', emailMe: 'There was a problem with the server, please try few more times and if this message persists, email unitedallpeople@gmail.com and referendum will be registered or supported from you name', emailSupport: 'unitedallpeople@gmail.com', messageSMS: 'please used code - codereplace - to confirm your phone', messageEmail: 'please used code - codereplace - to confirm your email', messageEmailSubject: 'Your email confirmation code', fieldLoadingFile: 'Attach file', strg: 'referendum', loading: 'Loading...', deleteing: 'Deleting...', downloading: 'Downloading...', checking: 'Checking...', emailCode: 'Entered email code does not match', phoneCode: 'Entered phone code does not match', emailphoneCode: 'Entered email and phone codes do not match',
            refData: { Title: 'Title', Desc: 'Description', Supported: 'Supported by', Attach: 'Attached File', AttachEmpty: 'None' },
            connecting: { waitconfirmcodes: 'Please wait confirming the codes', waitloading: 'Please wait loading' }
        },
        title: 'Referendum for USA',
        websocket: { supported: false, timing: 2000, counter: 0 },
        ariaBtn: { btnNewRef: 'Create new referendum', btnSupRef: 'Support referendum', btnNewRefRegRem: { reg: 'Register the new referendum', rem: 'Remove the newly registered referendum' }, btnNewRefFinal: '' },
        offlineMessage: { id: 'offLineID', v: 'Please wait for internet connection' }
    };
    var additionalTracking = {
        fileSaved: false,
        azr: ''
    };
    engUSA.track = additionalTracking;
    bg.track = additionalTracking;
    return function (lang) {
        switch (lang) {
            case 'English USA':
                return engUSA;
                break;
            case 'Български':
                return bg;
                break;
            default:
                return bg;
        }
    }
});
bgr.factory('normalizePhone', function () {
    String.prototype.replaceAll = function (str1, str2, ignore) {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"), (ignore ? "gi" : "g")), (typeof (str2) == "string") ? str2.replace(/\$/g, "$$$$") : str2);
    };
    return function (e, c) {
        let phone = e.trim();
        phone = ((((((phone.replaceAll('-', '')).replaceAll('+', '')).replaceAll('/', '')).replaceAll('.', '')).replaceAll(':', '')).replaceAll('\\', '')).replaceAll('|', '');
        switch (c) {
            case 'bulgaria':
                var d1 = (phone).charAt(0);
                var d2 = (phone).substring(0, 2);
                var d3 = (phone).substring(0, 3);
                var d5 = (phone).substring(0, 5);
                var addB = '+359';
                if (d5 == '00359') {
                    // No additions
                    phone = phone.replace('00359', '+359');
                }
                else {
                    if (d3 == '359') {
                        phone = '00' + phone;
                    }
                    else {
                        if (d2 == '00') {
                            //May be extra zero remove zero one and that is your phone
                            phone = addB + phone.substring(2, phone.length);
                        }
                        else {
                            if (d1 == '0') {
                                // remove zero one and that is your phone
                                phone = addB + phone.substring(1, phone.length);
                            }
                            else {
                                //
                                phone = addB + phone;
                            };
                        };
                    };
                };
            case 'usa':
                var addB = '+1';
                var d1 = (phone).charAt(0);
                var d2 = (phone).substring(0, 2);
                var d3 = (phone).substring(0, 3);
                if (d3 == '001') {
                    // No additions
                    phone = phone.replace('001', '+1');
                }
                else {
                    if (d1 == '1') {
                        // additions 00
                        phone = '00' + phone;
                    }
                    else {
                        // additions 001
                        phone = addB + phone;
                    };
                };
                break;
            default:
                //return bg;
                break;
        };
        return phone;
    };

});
bgr.factory('initializedSystemFactory', function () {
    return function (iam) {
        let obj;
        iam.words.registerRef.h = true;
        iam.urlFile = '';
        Object.keys(obj = iam.words).forEach(function (key, index) {
            if (index !== 0 && index <= 8) {
                obj[key].h = true;
                obj[key].v = '';
            };
        });
    };
});
bgr.factory('focusNewReferendumFactory', function () {
    return function (item, ni, ll, iam, timeout, page) {
        exitFocusNewRef: {
            if (ni === 6) {
                //Invalid email
                if (page === 'Y') {
                    iam.words.fieldsRefEmail.v = $('#fieldsRefEmail').val();
                };
                if (iam.words.fieldsRefEmail.v.indexOf('@') === -1 || iam.words.fieldsRefEmail.v.indexOf('.') === -1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === 1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === -1) {
                    $('#fieldsRefEmail').val('');
                    $('#fieldsRefEmail').attr('placeholder', iam.words.genericWords.invalidEmail);
                    timeout(function () {
                        $('#fieldsRefEmail').select();
                        iam.words.fieldsRefPhone.h = true;
                    });
                    break exitFocusNewRef;
                };
                //End Invalid email
            };
            let l = 0;
            if (typeof item !== 'undefined') {
                l = item.toString().length;
                if (l > ll) {
                    Object.keys(obj = iam.words).forEach(function (key, index) {
                        if (index == ni) {
                            var nextKey = Object.keys(obj)[ni];
                            (obj[nextKey]).h = false;
                        };
                    });
                };
            };
        };
    };
});
bgr.factory('trackChangesFactory', function () {
    return function (item, ni, ll, cw, iam, timeout) {
        //console.log('Tracking event - ' + item + 'Next index - ' + ni);
        if (ni === 6) {
            //Invalid email
            if (iam.words.fieldsRefEmail.v.indexOf('@') === -1 || iam.words.fieldsRefEmail.v.indexOf('.') === -1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === 1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === -1) {
                $('#fieldsRefEmail').val('');
                $('#fieldsRefEmail').attr('placeholder', iam.words.genericWords.invalidEmail);
                timeout(function () {
                    $('#fieldsRefEmail').select();
                    Object.keys(obj = iam.words).forEach(function (key, index) {
                        if (index >= ni) {
                            let nextKey = Object.keys(obj)[index];
                            (obj[nextKey]).h = true;
                            iam.urlFile = '';
                        };
                    });
                });
            };
            //End Invalid email
        } else {
            // Selecting next code
            if (ni === 7) {
                let l;
                if (typeof item === 'undefined') {
                    l = 0;
                }
                else {
                    l = item.toString().length;
                };
                if (l === ll + 1) {
                    timeout(function () {
                        $('#fieldsRefPhoneConfirm').select();
                    });
                };
            };
        };
        let l = 0;
        if (typeof item === 'undefined') {
            l = 0;
            Object.keys(obj = iam.words).forEach(function (key, index) {
                if (index >= ni) {
                    let nextKey = Object.keys(obj)[index];
                    (obj[nextKey]).h = true;
                };
            });
        }
        else {
            l = item.toString().length;
            if (l > ll) {
                Object.keys(obj = iam.words).forEach(function (key, index) {
                    if (ni === 8 && index === 7) {
                        if (l === ll + 1) {
                            iam.words.fieldsRefPhoneConfirm.v = $('#fieldsRefPhoneConfirm').val();
                            if (cw === 'Y') {
                                let p = new Promise(function (resolve, reject) {
                                    resolve(iam.confirmCode(cw));
                                });
                                p.then(function (result) {
                                    // All good confirmed
                                }, function (err) {
                                    // Error: "It broke"
                                    // Connection issue with the server
                                    // Load VIEW for issue with go back button to try again
                                    // End Connection issue with the server
                                });
                            } else {
                                iam.words.registerRef.h = false;
                            };
                        };
                    } else {
                        if (ni === 6) {
                            //Invalid email
                            if (iam.words.fieldsRefEmail.v.indexOf('@') === -1 && iam.words.fieldsRefEmail.v.indexOf('.') === -1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === 1 || (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) === -1) {
                                $('#fieldsRefEmail').val('');
                                $('#fieldsRefEmail').attr('placeholder', iam.words.genericWords.invalidEmail);
                                timeout(function () {
                                    $('#fieldsRefEmail').select();
                                    Object.keys(obj = iam.words).forEach(function (key, index) {
                                        if (index >= ni) {
                                            let nextKey = Object.keys(obj)[index];
                                            (obj[nextKey]).h = true;
                                            iam.urlFile = '';
                                        };
                                    });
                                });
                            };
                            //End Invalid email
                        };
                    };
                    if (index === ni) {
                        let nextKey = Object.keys(obj)[ni];
                        (obj[nextKey]).h = false;
                    };
                });
            }
            else {
                Object.keys(obj = iam.words).forEach(function (key, index) {
                    if (index > (ni - 1)) {
                        let nextKey = Object.keys(obj)[index];
                        (obj[nextKey]).h = true;
                    };
                });
            };
        };
    };
});
bgr.factory('updateNewReferendumFactory', function () {
    return function (e, id, iam, normalizePhone, caching, timeout, globalVariables) {
        iam.words[e.currentTarget.id].v = e.currentTarget.value.toString();
        //console.log(e.currentTarget.id + ' - ' + e.currentTarget.value + ' - ' + id);
        let tabPressed = false;
        $('body').on('keyup', function (e) {
            //console.log(e);
            if (e.which === 9) {
                tabPressed = true;
            } else {
                tabPressed = false;
            };
        });
        outer: {
            switch (e.currentTarget.id) {
                case 'fieldsRefTitle':
                    if (iam.words['fieldsRefGoals'].h === true && e.currentTarget.value === '') {
                        timeout(function () {
                            $('#' + e.currentTarget.id).select();
                        });
                    } else {
                        timeout(function () {
                            $('#fieldsRefGoals').select();
                        });
                    };
                    break outer;
                case 'fieldsRefGoals':
                    if (iam.words['fieldsRefFirstName'].h === true && e.currentTarget.value === '') {
                        timeout(function () {
                            $('#' + e.currentTarget.id).select();
                        });
                    }
                    else {
                        timeout(function () {
                            $('#fieldsRefFirstName').select();
                        });
                    };
                    break outer;
                case 'fieldsRefFirstName':
                    if (iam.words['fieldsRefLastName'].h === true && e.currentTarget.value === '') {
                        timeout(function () {
                            $('#' + e.currentTarget.id).select();
                        });
                    } else {
                        timeout(function () {
                            $('#fieldsRefLastName').select();
                        });
                    };
                    iam.person.firstName = e.currentTarget.value;
                    break outer;
                case 'fieldsRefLastName':
                    if (iam.words['fieldsRefEmail'].h === true && e.currentTarget.value === '') {
                        timeout(function () {
                            $('#' + e.currentTarget.id).select();
                        });
                    } else {
                        timeout(function () {
                            $('#fieldsRefEmail').select();
                        });
                    };
                    iam.person.lastName = e.currentTarget.value;
                    break outer;
                case 'fieldsRefEmail':
                    if (iam.words.fieldsRefEmail.v.indexOf('@') !== -1 && iam.words.fieldsRefEmail.v.indexOf('.') !== -1 && (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) !== 1 && (iam.words.fieldsRefEmail.v.indexOf('@') - iam.words.fieldsRefEmail.v.indexOf('.')) !== -1) {
                        iam.person.email = e.currentTarget.value;
                        iam.sendEmail();
                    };
                    break outer;
                case 'fieldsRefPhone':
                    iam.person.phone = normalizePhone(e.currentTarget.value, iam.words.country);
                    iam.sendSMS();
                    //caching.setCache(iam.storage.type, iam.storage.name, iam.person, 'object')
                    caching.setCache(globalVariables.getProperty(1, 'storage', 'type'), globalVariables.getProperty(1, 'storage', 'name'), iam.person, 'object');
                    //updateCache(caching, iam.storage.type, 'replace', iam.storage.name, true, iam.person, 'object');
                    break outer;
                default:
                    break outer;
            };
        };
    };
});
bgr.factory('registerReferendumFactory', function () {
    return function (iam, postURLData, globalVariables, normalizePhone, timeout) {
        iam.isVisibleSR = false;
        let caller = '';
        if (!iam.words.registerRef.r) {
            caller = 'reg';
            iam.dynamicButtons.regRef = iam.words.registerRef.ff;
            iam.words.ariaBtn.btnNewRefFinal = iam.words.ariaBtn.btnNewRefRegRem.rem;
        } else {
            caller = 'unr';
            iam.dynamicButtons.regRef = iam.words.registerRef.f;
            iam.words.ariaBtn.btnNewRefFinal = iam.words.ariaBtn.btnNewRefRegRem.reg;
        };
        iam.words.registerRef.r = !iam.words.registerRef.r;
        let d = {
            Title: iam.words.fieldsRefTitle.v,
            Description: iam.words.fieldsRefGoals.v,
            fn: iam.words.fieldsRefFirstName.v,
            ln: iam.words.fieldsRefLastName.v,
            Email: iam.words.fieldsRefEmail.v,
            Phone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
            AttachmentStr: iam.words.fieldsRefLoadedFile.v,
            sfn: iam.words.fieldsRefFirstName.v,
            sln: iam.words.fieldsRefLastName.v,
            sEmail: iam.words.fieldsRefEmail.v,
            sPhone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
            tbl: 'ref' + iam.words.abrv,
            Caller: caller
        };
        postURLData(globalVariables.getProperty(0, 'postReferendumsInfo').url, d, globalVariables.getProperty(0, 'postReferendumsInfo').contentType)
            .then(function (response) {
                if (response === 'f') {
                    iam.dynamicButtons.regRef = iam.words.registerRef.f;
                    //email me
                    iam.urlRef = 'Views/emailme.html';
                } else {
                    if (response === 'x') {
                        iam.dynamicButtons.regRef = iam.words.registerRef.f;
                    } else {
                        iam.dynamicButtons.regRef = iam.words.registerRef.ff;
                    };
                };
                console.log('Calling SignalR hub which will redistribute all referendums plus the newly registered one and it will update the front end of all users');
                iam.hub.server.send(iam.words.abrv);
            })
            .catch(function (error) {

            });
    };
});
bgr.factory('uploadFileFactory', function () {
    return function (http, ngDialog) {
        http.post(iam.serverCalls.webAPI + iam.serverCalls.uploadFile, f).
            success(function (data, status, headers, config) {
            }).
            error(function (data, status, headers, config) {
                //email me
                iam.urlRef = 'Views/emailme.html';
            });
    };
});
bgr.factory('confirmCodeFactory', function () {
    return function (iam, http, ngDialog, normalizePhone, cw) {
        exit: {
            // Disabling real check of email and phone for school here
            if (cw === 'Y') {
                iam.words.track.azr = "https://allpeopleunited.blob.core.windows.net/usareferendum?sv=2015-04-05&ss=bfqt&srt=sco&sp=rwdlacup&se=2017-12-31T00:48:51Z&st=2016-10-18T16:48:51Z&spr=https&sig=W%2FPGfyK%2BuMF0yZo%2Bsdi%2FOq6Nv0lrXT2nSxCLq6XkqvU%3D";
                iam.urlFile = 'Views/LoadingFile.html';
                iam.words.registerRef.h = false;
            };
            break exit;
            // Disabling real check of email and phone for school here
            let d = iam.words.abrv + '|' + iam.words.fieldsRefFirstName.v + ' ' + iam.words.fieldsRefLastName.v + '|' + iam.words.fieldsRefEmail.v + '|' + normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country) + '|' + iam.words.fieldsRefEmailConfirm.v + '|' + iam.words.fieldsRefPhoneConfirm.v;
            let dialog = ngDialog.open({
                template: '<h3><center><img src="Images/l0.gif"> ' + iam.words.genericWords.connecting.waitconfirmcodes + '</center></h3>',
                plain: true,
                showClose: false,
                overlay: true,
                cache: false,
                preserveFocus: true,
                trapFocus: true,
                ariaAuto: true,
                ariaRole: 'loading',
                ariaLabelledById: 'idloading',
                closeByDocument: false,
                closeByEscape: false
            });
            http.post(iam.serverCalls.webAPI + iam.serverCalls.getSAA, d).success(function (data, status, headers, config) {
                if (data.length > 1) {
                    ngDialog.closeAll();
                    // Show file load
                    if (cw === 'Y') {
                        iam.words.track.azr = data;
                        iam.words.registerRef.h = false;
                    };
                } else {
                    //email me
                    iam.urlRef = 'Views/emailme.html';
                };
            }).error(function (data, status, headers, config) {
                //email me
                iam.urlRef = 'Views/emailme.html';
            });
        };
    };
});
bgr.factory('getReferendumInformationFactory', function () {
    return function (iam, http) {
        let r = [];
        http.post(iam.serverCalls.webAPI + iam.serverCalls.getRI, iam.words.abrv)
            //http.get(iam.serverCalls.getRI)
            .success(function (data, status, headers, config) {
                r = data;
            }).error(function (data, status, headers, config) {
                r = data;
            });
        return r;
    };
});
bgr.factory('voteForRefFactory', function () {
    return function (i, l, iam, postURLData, ngDialog, normalizePhone, caching, globalVariables) {
        //i is index of many buttons
        //l represents the two types of buttons 1 for many,
        //0 for one button on the form for voting
        //0 type button only concern is vote
        //1 type button is vote and redraw
        //console.log('index - ' + i + '; button - ' + l);
        iam.words.fieldsRefGoals.v = iam.words.referendumSelected.description;
        iam.words.fieldsRefTitle.v = iam.words.referendumSelected.title;
        iam.words.fieldsRefLoadedFile.v = $('#fieldsRefLoadedFile').val();
        iam.person = caching.getCache(globalVariables.getProperty(1, 'storage', 'type'), 'person', 'object');
        iam.words.fieldsRefFirstName.v = iam.person.firstName;
        iam.words.fieldsRefLastName.v = iam.person.lastName;
        iam.words.fieldsRefEmail.v = iam.person.email;
        iam.words.fieldsRefPhone.v = iam.person.phone;
        //////////////////////////////////////////// button 1
        if (l === 1) {
            iam.words.referendumSelected = iam.words.referendumsAll[i];
            iam.words.referendumSelected.id = i;
            let c = $('#supportRefBtn' + i).html().trim();
            if (c === iam.words.supportRef.f) {
                ///////////// Voting here
                let dialog = ngDialog.openConfirm({
                    template: 'voteForReferendum',
                    className: 'ngdialog-theme-default',
                    closeByDocument: false,
                    scope: iam
                });
            } else {
                ///////////// Redraw support here
                d = {
                    Title: iam.words.referendumSelected.title,
                    Description: iam.words.referendumSelected.description,
                    fn: iam.words.fieldsRefFirstName.v,
                    ln: iam.words.fieldsRefLastName.v,
                    Email: iam.words.fieldsRefEmail.v,
                    Phone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
                    AttachmentStr: '',
                    sfn: iam.words.fieldsRefFirstName.v,
                    sln: iam.words.fieldsRefLastName.v,
                    sEmail: iam.words.fieldsRefEmail.v,
                    sPhone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
                    tbl: 'ref' + iam.words.abrv,
                    Caller: 'unv'
                };
                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.f);
                postURLData(globalVariables.getProperty(0, 'postReferendumsInfo').url, d, globalVariables.getProperty(0, 'postReferendumsInfo').contentType)
                    .then(function (response) {
                        if (response === 't') {
                            $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.ff);
                        } else {
                            if (response === 'x') {
                                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.f);
                            } else {
                                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.f);
                                //email me
                                iam.urlRef = 'Views/emailme.html';
                            };
                        };
                        console.log('Calling SignalR hub which will redistribute all referendums plus the newly casted vote or redrawn vote and it will update the front end of all users');
                        iam.hub.server.send(iam.words.abrv);
                    })
                    .catch(function (error) {
                        //email me
                        iam.urlRef = 'Views/emailme.html';
                    });
            };
        }
        //////////////////////////////////////////// button type 0 only vote
        else {
            /////////////////////// Support here
            let p = new Promise(function (resolve, reject) {
                resolve(iam.confirmCode('N'));
            });
            p.then(function (result) {
                // All good confirmed
                // Vote here
                d = {
                    Title: iam.words.fieldsRefTitle.v,
                    Description: iam.words.fieldsRefGoals.v,
                    fn: iam.words.fieldsRefFirstName.v,
                    ln: iam.words.fieldsRefLastName.v,
                    Email: iam.words.fieldsRefEmail.v,
                    Phone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
                    AttachmentStr: '',
                    sfn: iam.words.fieldsRefFirstName.v,
                    sln: iam.words.fieldsRefLastName.v,
                    sEmail: iam.words.fieldsRefEmail.v,
                    sPhone: normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country),
                    tbl: 'ref' + iam.words.abrv,
                    Caller: 'vot'
                };
                ngDialog.closeAll();
                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.ff);
                postURLData(globalVariables.getProperty(0, 'postReferendumsInfo').url, d, globalVariables.getProperty(0, 'postReferendumsInfo').contentType)
                    .then(function (response) {
                        if (response === 't') {
                            $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.ff);
                        } else {
                            if (response === 'x') {
                                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.f);
                            } else {
                                $('#supportRefBtn' + iam.words.referendumSelected.id).html(iam.words.supportRef.f);
                                //email me
                                iam.urlRef = 'Views/emailme.html';
                            };
                        };
                        console.log('Calling SignalR hub which will redistribute all referendums plus the newly casted vote and it will update the front end of all users');
                        iam.hub.server.send(iam.words.abrv);
                    })
                    .catch(function (error) {
                        //email me
                        iam.urlRef = 'Views/emailme.html';
                    });
            }, function (err) {
                //email me
                iam.urlRef = 'Views/emailme.html';
            });
        };
    };
});
bgr.factory('sendSMSFactory', function () {
    return function (iam, http, ngDialog) {
        brSMS: {
            // Disabling real check of email and phone for school here
            break brSMS;
            // Disabling real check of email and phone for school here
            let d = iam.words.abrv + '|s|' + iam.words.fieldsRefFirstName.v + ' ' + iam.words.fieldsRefLastName.v + '|' + normalizePhone(iam.words.fieldsRefPhone.v, iam.words.country) + '|' + iam.words.genericWords.messageSMS;
            //Send SMS here
            http.post(iam.serverCalls.webAPI + iam.serverCalls.sendCode, d)
                .success(function (data, status, headers, config) {
                    if (data !== 'f') {
                        // All is good
                    } else {
                        //email me
                        iam.urlRef = 'Views/emailme.html';
                    };
                })
                .error(function (data, status, headers, config) {
                    //email me
                    iam.urlRef = 'Views/emailme.html';
                });
        };
    };
});
bgr.factory('sendEmailFactory', function () {
    return function (url) {
        brEmail: {
            // Disabling real check of email and phone for school here
            break brEmail;
            // Disabling real check of email and phone for school here
            let d = iam.words.abrv + '|e|' + iam.words.fieldsRefFirstName.v + ' ' + iam.words.fieldsRefLastName.v + '|' + iam.words.fieldsRefEmail.v + '|' + iam.words.genericWords.messageEmail + '|' + iam.words.genericWords.messageEmailSubject;
            http.post(iam.serverCalls.webAPI + iam.serverCalls.sendCode, d)
                .success(function (data, status, headers, config) {
                    if (data !== 'f') {
                        // All is good
                    } else {
                        //email me
                        iam.urlRef = 'Views/emailme.html';
                    };
                })
                .error(function (data, status, headers, config) {
                    //email me
                    iam.urlRef = 'Views/emailme.html';
                });
        };

    };
});
bgr.factory('caching', function () {
    //http://www.w3schools.com/html/html5_webstorage.asp
    return {
        setCache: function (s, k, v, type) {
            c: {
                let t = type.toLowerCase().trim();
                //window.localStorage - stores data with no expiration date
                //window.sessionStorage - stores data for one session (data is lost when the browser tab is closed)
                if (s === 'sessionStorage' || s === 'localStorage') {
                    if (typeof (window[s]) !== 'undefined') {
                        // reseting forcefuly
                        if (typeof (window[s][k]) !== 'undefined') {
                            window[s].removeItem(k);
                        };
                        if (t === 'object' || t === 'array') {
                            window[s].setItem(k, JSON.stringify(v));
                        }
                        else {
                            window[s].setItem(k, v);
                        };
                        break c;
                    } else {
                        return false;
                    };
                };
            };
        },
        getCache: function (s, k, type) {
            let t = type.toLowerCase().trim();
            c: {
                if (typeof (window[s][k]) !== 'undefined') {
                    if (t === 'object' || t === 'array') {
                        return JSON.parse(window[s][k]);
                    } else {
                        return window[s][k];
                    };
                    break c;
                } else {
                    return false;
                    break c;
                };
            };
        }
    };
});
bgr.factory('signalRHub', function () {
    return function (iam, c, gv, caching) {
        if (c === 2) {
            // console.log(iam.words.country);
            let server = gv['server'];
            $.connection.hub.url = server + gv['hub'];
            let hubProxy = $.connection.hub.proxies.referendumhub;
            iam.hub = hubProxy;
            // console.log($.connection.hub.proxies.referendumhub);
            hubProxy.client.broadcastMessage = function (r) {         //received
                console.log('Below is the information that is received from SignalR hub, the message that was broadcated to all users');
                console.log('This stringified JSON object is all registered referendums');
                console.log(r);
                // caching.setCache(gv.storage.type, 'data', r, 'string');
                iam.words.referendumSelected = {};
                iam.words.referendumSelected.id = -1;
                iam.words.referendumsAll = JSON.parse(r);
                //caching.getCache(gv.storage.type, 'data', 'array');
                iam.$apply();
            };
            $.connection.hub.start().done(function () {
                // calling server methods/functions with name and signiture
                hubProxy.server.send(iam.words.country);
                iam.$apply();
            });
        };
    };
});