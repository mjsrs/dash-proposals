from firebase import firebase
import subprocess
import json
import datetime
import requests
import config

CONFIG_FILE_PATH = "/root/data/dash-proposals/wallet/config.ini"
DATA_PATH = "/root/data"
CONF_PATH = "/root/data/dash.conf"


def chunks(s, n):
    for start in range(0, len(s), n):
        yield s[start:start+n]


def main():
    appconfig = config.getConfiguration(CONFIG_FILE_PATH)
    if appconfig is None:
        message = "Error parsing config file"
        raise Exception(message)

    required_config_keys = ['firebase']
    for key in required_config_keys:
        if key not in appconfig:
            message = "*** ERROR: key \'%s\' is required" % key
            raise Exception(message)

    auth = firebase.FirebaseAuthentication(appconfig['firebase']['token'], appconfig['firebase']['email'])
    dashproposals = firebase.FirebaseApplication(appconfig['firebase']['url'], auth)

    default_cmd = ["dash-cli", "-datadir=%s" % DATA_PATH, "-conf=%s" % CONF_PATH]

    #run dash-cli getmininginfo
    #dashd should already been started
    cmd = default_cmd + ["getmininginfo"]
    getmininginfo = subprocess.check_output(cmd)
    getmininginfo = json.loads(getmininginfo)
    print getmininginfo

    #run dash-cli masternode count
    cmd = default_cmd + ["masternode", "count"]
    masternodecount = subprocess.check_output(cmd)
    print "masternodecount: %s" % masternodecount
    dashproposals.put("", "masternodes", masternodecount)

    #proposals
    cmd = default_cmd + ["mnbudget", "show"]
    proposals = subprocess.check_output(cmd)
    proposals = json.loads(proposals)

    print "Proposals"
    for i in proposals:
        print proposals[i]
        proposals[i]["timestamp"] = {".sv": "timestamp"}

    dashproposals.put("", "proposals", proposals)

if __name__ == "__main__":
    main()
