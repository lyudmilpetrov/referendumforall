# Referendum for all nations
## I. cd to main location/folder of the index.html file
## II. run from terminal following command, before that navigating to the root of the app:
```javascript
npm install
```
<h5 style='color:red'>This will install all dependencies for <b style='color:red'>Gulp</b></h5>
## III. Run gulp start in your console/terminal
<h5 style='color:red'>This will serve the app on http://localhost:3004/ </h5>
## IV. In order to use the app no need to use real emails and phone numbers, since the feature is disable for convinience for the tester
## V. Or just visit the following website: http://referendumforall.azurewebsites.net/

<h5 style='color:green'>Big thank you to Bill Stavroulakis and his course on Getting Started with Progressive Web Apps</h5>

<h5 style='color:purple'>Please check the following websites: </br>
http://realfavicongenerator.net/
</br>
and
</br>
http://caniuse.com/
</h5>
# NOTES SECTION:
## for recreating the live experience it was chosen SignalR,
## there are some essential points where SignalR is used
## I. at the point of getting the information, seeding the info for all referendums that we can support
### see line 799 at Factories/factories.js
## II. at the point of registering new referendum and supporting/redrawing a support of an existing one
### see line 496, 633, 681 at Factories/factories.js
#### in general there is one hub on the server 
#### https://gdcapi.azurewebsites.net/signalr/hubs
#### with two methods, see factory signalRHub at lines 787 - 814 at Factories/factories.js
#### First method is called broadcastMessage (hubProxy.client.broadcastMessage function line 796), which is receiving method on the client
#### this method has only one purpose to receive information sent from SignalR hub and to update the user interface
#### this method is broad-casted to all users / browsers
#### Second method is a client / browser calling SignalR hub, asking to get the latest info of the referendums and to broadcast to all users
#### this method is call hubProxy.server.send, see line 809.

# If you would like to have full testing experience replace
```javascript
 <script src="app.min.js"></script>
 ```
 # with
 ```javascript
 <script src="Modules/modules.js"></script>
 <script src="Factories/factories.js"></script>
 <script src="Directives/directives.js"></script>
 <script src="Controllers/controllers.js"></script>
 <script src="swStart.js"></script>
 ```
 
