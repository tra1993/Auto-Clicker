#!/bin/bash
# သတိပြုရန်: သင့် project directory (ဥပမာ: ~/Auto-Clicker) အတွင်းတွင် ရှိနေရမည်။

echo "--- capacitor.config.json ဖိုင်ကို ဖန်တီးနေသည် ---"

# Capacitor ၏ configuration ကို ရေးသားသည်
cat << EOF > capacitor.config.json
{
  "appId": "com.tra1993.autoclicker",
  "appName": "AutoClicker",
  "webDir": "build",
  "bundledWebRuntime": false
}
EOF

echo "capacitor.config.json ဖိုင်ကို အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ။"
