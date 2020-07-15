var addresses = [
  {
    url: "localhost:6661",
    desc: "local"
  },
  {
    url: "http://192.168.0.5:6161",
    desc: "cealsa"
  },
  {
    url: "http://200.124.156.117:8099",
    desc: "ferco"
  }
]

var fso, tf;

for (var i = 0; i < addresses.length; i++) {
  var url = addresses[i].url
  var desc = addresses[i].desc

  WScript.Echo("\nCompiling for " + desc + " (" + url + ")");

  scriptdir = WScript.ScriptFullName.substring(0,WScript.ScriptFullName.lastIndexOf(WScript.ScriptName)-1);
  fso = new ActiveXObject("Scripting.FileSystemObject");
  tf = fso.CreateTextFile(scriptdir + "\\src\\providers\\security\\security.ts", true);

  tf.WriteLine('import{Injectable}from"@angular/core";import{DataResponse,DataRequest,Model}from"../../models/models";import{ApiClientV3Provider}from"../api-client/api-client.v3";@Injectable()export class SecurityProvider{constructor(private api:ApiClientV3Provider){}public async validateCredentials(userCredentials:DataRequest.Login):Promise<DataResponse.Login>{userCredentials.communicationAddress="' + url +'";return this.api.login(userCredentials)}};');

  tf.Close();

  var oShell = WScript.CreateObject("WScript.Shell");
  var renameScript = 'ren "'+ scriptdir + '\\platforms\\android\\build\\outputs\\apk\\android-debug.apk" "' + url.replace(':', '-') +'.apk"';

  oShell.Run(scriptdir + "/node_modules/.bin/ionic cordova build android' & " + renameScript + "& timeout /t 3000", 1 /* SW_SHOWNORMAL */, true /* bWaitOnReturn */);
  WScript.Echo("Compiled!\n=========");

  //fso.MoveFile(scriptdir + '\\platforms\\android\\build\\outputs\\apk\\android-debug.apk', scriptdir + '\\platforms\\android\\build\\outputs\\apk\\swift@' + desc +'.apk')
}