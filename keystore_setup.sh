#!/bin/bash
# သတိပြုရန်: ဤ script ကို Termux/Debian တွင် run ပါ။ openjdk-17 ကို install လုပ်ထားရပါမည်။

echo "--- 1. Keystore ဖိုင်အသစ် release.keystore ကို ဖန်တီးမည် ---"
echo "မှတ်ချက်: စကားဝှက်များကို အမြဲမှတ်ထားပါ၊ ၎င်းတို့သည် 'KEY_PASSWORD' နှင့် 'KEY_ALIAS' များ ဖြစ်လာပါမည်။"
echo "Alias အတွက် 'autoclickeralias' ကို အသုံးပြုရန် အကြံပြုပါသည်။"

# keytool သည် Java Development Kit (JDK) နှင့်အတူ ပါလာပါသည်။
keytool -genkey -v -keystore release.keystore \
        -alias autoclickeralias \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000

echo "Keystore ဖိုင်အသစ်ကို release.keystore အဖြစ် အောင်မြင်စွာ ဖန်တီးပြီးပါပြီ။"
