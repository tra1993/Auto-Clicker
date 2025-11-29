#!/bin/bash
# သတိပြုရန်: သင့် project directory (ဥပမာ: ~/Auto-Clicker) အတွင်းတွင် ရှိနေရမည်။

echo "--- 1. lucide-react package ကို ထည့်သွင်းခြင်း ---"
npm install lucide-react

echo "--- 2. Production Build ကို ပြန်လည်လုပ်ဆောင်ခြင်း ---"
npm run build 

# Verification: build အောင်မြင်ပါက၊ အောက်ပါများကို ဆက်လုပ်ပါ

# 3. Capacitor sync
npx cap sync android

# 4. Gradle ဖြင့် Release APK Build
cd android
gradle assembleRelease

echo "Build လုပ်ငန်းစဉ်အားလုံး ပြီးဆုံးသွားပြီဟု ယူဆပါသည်။"
echo "APK ဖိုင်ကို android/app/build/outputs/apk/release/ တွင် ရှာတွေ့နိုင်ပါသည်။"
