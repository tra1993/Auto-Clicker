#!/bin/bash
# သတိပြုရန်: သင့် project directory (ဥပမာ: ~/Auto-Clicker) အတွင်းတွင် ရှိနေရမည်။

echo "--- 1. Capacitor Sync (Web assets ကို Android project ထဲသို့ ထည့်သွင်းခြင်း) ---"
npx cap sync android

echo "--- 2. Android Folder ထဲသို့ ဝင်ရောက်ခြင်း ---"
cd android

echo "--- 3. Gradle ဖြင့် Release APK Build လုပ်ခြင်း ---"
# Termux တွင် ပြင်ဆင်ထားသော Gradle ကို သုံး၍ build ပါ
# (ဤအဆင့်တွင် Signing Configuration လိုအပ်နိုင်ပါသည်။)
gradle assembleRelease

# 4. Verification: APK ဖိုင် တည်ရှိခြင်းကို စစ်ဆေးခြင်း
APK_PATH="app/build/outputs/apk/release/app-release-unsigned.apk"
if [ -f "$APK_PATH" ]; then
    echo "--- Build အောင်မြင်သည် ---"
    echo "Release APK ဖိုင်ကို ဤနေရာတွင် ရှာတွေ့နိုင်သည်:"
    echo "$PWD/$APK_PATH"
    
    # Signing မရှိသော APK ဖြစ်ပါက install လုပ်ရန် adb ကို သုံးရမည်
    echo "ဤ APK သည် unsigned ဖြစ်သောကြောင့် Play Store တွင် တင်၍ မရပါ။ စမ်းသပ်ရန်အတွက်သာ ဖြစ်ပါသည်။"
else
    echo "--- Build ပျက်ကွက်သည် ---"
    echo "APK ဖိုင်ကို ရှာမတွေ့ပါ။ Gradle build log များကို စစ်ဆေးပါ။"
fi
