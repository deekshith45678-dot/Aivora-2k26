import {
  ArrowRight,
  Bell,
  BellRing,
  Check,
  ChevronDown,
  CircleHelp,
  CloudRain,
  Droplets,
  Globe2,
  Leaf,
  LineChart,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  Package,
  PanelLeft,
  Search,
  Settings2,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sprout,
  Sun,
  Tractor,
  TrendingUp,
  UploadCloud,
  UserRound,
  UsersRound,
  Volume2,
  Wheat,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { translate } from "@/lib/i18n";
import FieldHealth from "./FieldHealth";

type Role = "farmer" | "customer";
type View = "overview" | "advisor" | "health" | "market" | "assistant" | "orders" | "settings";
type LanguageCode =
  | "en"
  | "te"
  | "hi"
  | "ta"
  | "kn"
  | "ml"
  | "mr"
  | "bn"
  | "gu"
  | "pa";

type Copy = {
  dashboard: string;
  overview: string;
  advisor: string;
  marketplace: string;
  assistant: string;
  orders: string;
  settings: string;
  signIn: string;
  farmer: string;
  customer: string;
  fullName: string;
  phone: string;
  otp: string;
  requestOtp: string;
  verify: string;
  continueLabel: string;
  developmentOtp: string;
  developmentOtpDetail: string;
  chooseJourney: string;
  chooseJourneyDetail: string;
  nextMove: string;
  viewPlan: string;
  askAssistant: string;
  searchProduce: string;
  addToCart: string;
  inCart: string;
  sample: string;
  demo: string;
  save: string;
  send: string;
};

let activeLanguage: LanguageCode = "en";
const tr = (key: string, fallback: string) => translate(activeLanguage, key, fallback);

const languageOptions: Array<{ code: LanguageCode; label: string; native: string }> = [
  { code: "en", label: "English", native: "English" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "kn", label: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", label: "Malayalam", native: "മലയാളം" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
];

const translations: Record<LanguageCode, Copy> = {
  en: {
    dashboard: "Dashboard",
    overview: "Overview",
    advisor: "Crop advisor",
    marketplace: "Marketplace",
    assistant: "AI assistant",
    orders: "Orders",
    settings: "Settings",
    signIn: "Sign in",
    farmer: "Farmer login",
    customer: "Customer login",
    fullName: "Full name",
    phone: "Mobile number",
    otp: "One-time passcode",
    requestOtp: "Send OTP",
    verify: "Verify & continue",
    continueLabel: "Continue",
    developmentOtp: "Development OTP mode",
    developmentOtpDetail: "SMS delivery is not connected. Use the test code 2846 to preview the flow.",
    chooseJourney: "Choose your AgriSense journey",
    chooseJourneyDetail: "One workspace for growing better, selling fairly, and buying from the field.",
    nextMove: "Your next best field move",
    viewPlan: "View plan",
    askAssistant: "Ask the field assistant",
    searchProduce: "Search produce, seeds, tools...",
    addToCart: "Add to cart",
    inCart: "In cart",
    sample: "Sample inventory",
    demo: "Demo data",
    save: "Save changes",
    send: "Send",
  },
  te: {
    dashboard: "డ్యాష్‌బోర్డ్",
    overview: "అవలోకనం",
    advisor: "పంట సలహాదారు",
    marketplace: "మార్కెట్‌ప్లేస్",
    assistant: "AI సహాయకుడు",
    orders: "ఆర్డర్లు",
    settings: "సెట్టింగ్స్",
    signIn: "సైన్ ఇన్",
    farmer: "రైతు లాగిన్",
    customer: "కస్టమర్ లాగిన్",
    fullName: "పూర్తి పేరు",
    phone: "మొబైల్ నంబర్",
    otp: "వన్-టైమ్ పాస్‌కోడ్",
    requestOtp: "OTP పంపండి",
    verify: "ధృవీకరించి కొనసాగండి",
    continueLabel: "కొనసాగండి",
    developmentOtp: "డెవలప్‌మెంట్ OTP మోడ్",
    developmentOtpDetail: "SMS ఇంకా కనెక్ట్ కాలేదు. ప్రవాహాన్ని చూడటానికి 2846 కోడ్ ఉపయోగించండి.",
    chooseJourney: "మీ AgriSense ప్రయాణాన్ని ఎంచుకోండి",
    chooseJourneyDetail: "మెరుగ్గా పండించడానికి, న్యాయంగా అమ్మడానికి, పొలం నుంచి కొనడానికి ఒక వర్క్‌స్పేస్.",
    nextMove: "మీ తదుపరి ఉత్తమ పొల చర్య",
    viewPlan: "ప్లాన్ చూడండి",
    askAssistant: "ఫీల్డ్ సహాయకుడిని అడగండి",
    searchProduce: "పంటలు, విత్తనాలు, పరికరాలు వెతకండి...",
    addToCart: "కార్ట్‌కు జోడించండి",
    inCart: "కార్ట్‌లో ఉంది",
    sample: "నమూనా ఇన్వెంటరీ",
    demo: "డెమో డేటా",
    save: "మార్పులు సేవ్ చేయండి",
    send: "పంపండి",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    overview: "अवलोकन",
    advisor: "फसल सलाहकार",
    marketplace: "मार्केटप्लेस",
    assistant: "AI सहायक",
    orders: "ऑर्डर",
    settings: "सेटिंग्स",
    signIn: "साइन इन",
    farmer: "किसान लॉगिन",
    customer: "ग्राहक लॉगिन",
    fullName: "पूरा नाम",
    phone: "मोबाइल नंबर",
    otp: "वन-टाइम पासकोड",
    requestOtp: "OTP भेजें",
    verify: "सत्यापित करके जारी रखें",
    continueLabel: "जारी रखें",
    developmentOtp: "डेवलपमेंट OTP मोड",
    developmentOtpDetail: "SMS जुड़ा नहीं है। फ्लो देखने के लिए टेस्ट कोड 2846 इस्तेमाल करें।",
    chooseJourney: "अपना AgriSense अनुभव चुनें",
    chooseJourneyDetail: "बेहतर उगाने, सही दाम पर बेचने और खेत से खरीदने की एक जगह।",
    nextMove: "आपका अगला बेहतर खेत कदम",
    viewPlan: "प्लान देखें",
    askAssistant: "फील्ड सहायक से पूछें",
    searchProduce: "उपज, बीज, औज़ार खोजें...",
    addToCart: "कार्ट में जोड़ें",
    inCart: "कार्ट में",
    sample: "सैंपल इन्वेंटरी",
    demo: "डेमो डेटा",
    save: "बदलाव सेव करें",
    send: "भेजें",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    overview: "கண்ணோட்டம்",
    advisor: "பயிர் ஆலோசகர்",
    marketplace: "சந்தை",
    assistant: "AI உதவியாளர்",
    orders: "ஆர்டர்கள்",
    settings: "அமைப்புகள்",
    signIn: "உள்நுழை",
    farmer: "விவசாயி உள்நுழைவு",
    customer: "வாடிக்கையாளர் உள்நுழைவு",
    fullName: "முழுப் பெயர்",
    phone: "மொபைல் எண்",
    otp: "ஒருமுறை கடவுச்சொல்",
    requestOtp: "OTP அனுப்பு",
    verify: "சரிபார்த்து தொடர்க",
    continueLabel: "தொடர்க",
    developmentOtp: "டெவலப்மெண்ட் OTP முறை",
    developmentOtpDetail: "SMS இணைக்கப்படவில்லை. ஓட்டத்தைப் பார்க்க 2846 குறியீட்டை பயன்படுத்தவும்.",
    chooseJourney: "உங்கள் AgriSense பயணத்தைத் தேர்ந்தெடுக்கவும்",
    chooseJourneyDetail: "சிறப்பாக வளர்க்கவும், நியாயமாக விற்கவும், பண்ணையிலிருந்து வாங்கவும் ஒரு இடம்.",
    nextMove: "உங்கள் அடுத்த சிறந்த வயல் நடவடிக்கை",
    viewPlan: "திட்டத்தைப் பார்க்க",
    askAssistant: "வயல் உதவியாளரிடம் கேளுங்கள்",
    searchProduce: "பயிர்கள், விதைகள், கருவிகள் தேடுக...",
    addToCart: "கார்ட்டில் சேர்",
    inCart: "கார்ட்டில் உள்ளது",
    sample: "மாதிரி சரக்கு",
    demo: "டெமோ தரவு",
    save: "மாற்றங்களைச் சேமி",
    send: "அனுப்பு",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    overview: "ಅವಲೋಕನ",
    advisor: "ಬೆಳೆ ಸಲಹೆಗಾರ",
    marketplace: "ಮಾರುಕಟ್ಟೆ",
    assistant: "AI ಸಹಾಯಕ",
    orders: "ಆರ್ಡರ್‌ಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    signIn: "ಸೈನ್ ಇನ್",
    farmer: "ರೈತ ಲಾಗಿನ್",
    customer: "ಗ್ರಾಹಕ ಲಾಗಿನ್",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    otp: "ಒನ್-ಟೈಮ್ ಪಾಸ್‌ಕೋಡ್",
    requestOtp: "OTP ಕಳುಹಿಸಿ",
    verify: "ಪರಿಶೀಲಿಸಿ ಮುಂದುವರಿಯಿರಿ",
    continueLabel: "ಮುಂದುವರಿಸಿ",
    developmentOtp: "ಡೆವಲಪ್‌ಮೆಂಟ್ OTP ಮೋಡ್",
    developmentOtpDetail: "SMS ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ. ಪೂರ್ವವೀಕ್ಷಣೆಗೆ 2846 ಕೋಡ್ ಬಳಸಿ.",
    chooseJourney: "ನಿಮ್ಮ AgriSense ಪ್ರಯಾಣ ಆಯ್ಕೆಮಾಡಿ",
    chooseJourneyDetail: "ಉತ್ತಮವಾಗಿ ಬೆಳೆಯಲು, ನ್ಯಾಯವಾಗಿ ಮಾರಲು ಮತ್ತು ಹೊಲದಿಂದ ಖರೀದಿಸಲು ಒಂದು ಜಾಗ.",
    nextMove: "ನಿಮ್ಮ ಮುಂದಿನ ಉತ್ತಮ ಹೊಲದ ಹೆಜ್ಜೆ",
    viewPlan: "ಯೋಜನೆ ನೋಡಿ",
    askAssistant: "ಫೀಲ್ಡ್ ಸಹಾಯಕರನ್ನು ಕೇಳಿ",
    searchProduce: "ಬೆಳೆ, ಬೀಜ, ಉಪಕರಣ ಹುಡುಕಿ...",
    addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
    inCart: "ಕಾರ್ಟ್‌ನಲ್ಲಿ",
    sample: "ಮಾದರಿ ಇನ್ವೆಂಟರಿ",
    demo: "ಡೆಮೋ ಡೇಟಾ",
    save: "ಬದಲಾವಣೆ ಉಳಿಸಿ",
    send: "ಕಳುಹಿಸಿ",
  },
  ml: {
    dashboard: "ഡാഷ്ബോർഡ്",
    overview: "അവലോകനം",
    advisor: "വിള ഉപദേഷ്ടാവ്",
    marketplace: "മാർക്കറ്റ്പ്ലേസ്",
    assistant: "AI സഹായി",
    orders: "ഓർഡറുകൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    signIn: "സൈൻ ഇൻ",
    farmer: "കർഷക ലോഗിൻ",
    customer: "ഉപഭോക്തൃ ലോഗിൻ",
    fullName: "പൂർണ്ണ പേര്",
    phone: "മൊബൈൽ നമ്പർ",
    otp: "ഒറ്റത്തവണ പാസ്‌കോഡ്",
    requestOtp: "OTP അയക്കുക",
    verify: "പരിശോധിച്ച് തുടരുക",
    continueLabel: "തുടരുക",
    developmentOtp: "ഡെവലപ്‌മെന്റ് OTP മോഡ്",
    developmentOtpDetail: "SMS ബന്ധിപ്പിച്ചിട്ടില്ല. പ്രിവ്യൂവിന് 2846 കോഡ് ഉപയോഗിക്കുക.",
    chooseJourney: "നിങ്ങളുടെ AgriSense യാത്ര തിരഞ്ഞെടുക്കുക",
    chooseJourneyDetail: "നന്നായി വളർത്താനും ന്യായമായി വിൽക്കാനും കൃഷിയിടത്തിൽ നിന്ന് വാങ്ങാനും ഒരു ഇടം.",
    nextMove: "നിങ്ങളുടെ അടുത്ത മികച്ച കൃഷിയിട നീക്കം",
    viewPlan: "പ്ലാൻ കാണുക",
    askAssistant: "ഫീൽഡ് സഹായിയോട് ചോദിക്കുക",
    searchProduce: "വിളകൾ, വിത്തുകൾ, ഉപകരണങ്ങൾ തിരയുക...",
    addToCart: "കാർട്ടിലേക്ക് ചേർക്കുക",
    inCart: "കാർട്ടിൽ",
    sample: "സാമ്പിൾ ഇൻവെന്ററി",
    demo: "ഡെമോ ഡാറ്റ",
    save: "മാറ്റങ്ങൾ സംരക്ഷിക്കുക",
    send: "അയക്കുക",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    overview: "आढावा",
    advisor: "पीक सल्लागार",
    marketplace: "मार्केटप्लेस",
    assistant: "AI सहाय्यक",
    orders: "ऑर्डर्स",
    settings: "सेटिंग्ज",
    signIn: "साइन इन",
    farmer: "शेतकरी लॉगिन",
    customer: "ग्राहक लॉगिन",
    fullName: "पूर्ण नाव",
    phone: "मोबाइल नंबर",
    otp: "वन-टाइम पासकोड",
    requestOtp: "OTP पाठवा",
    verify: "पडताळून पुढे जा",
    continueLabel: "पुढे जा",
    developmentOtp: "डेव्हलपमेंट OTP मोड",
    developmentOtpDetail: "SMS जोडलेले नाही. पाहण्यासाठी 2846 कोड वापरा.",
    chooseJourney: "तुमचा AgriSense प्रवास निवडा",
    chooseJourneyDetail: "चांगले पिकवण्यासाठी, योग्य दरात विकण्यासाठी आणि शेतातून खरेदीसाठी एक जागा.",
    nextMove: "तुमची पुढची चांगली शेत कृती",
    viewPlan: "प्लॅन पहा",
    askAssistant: "फील्ड सहाय्यकाला विचारा",
    searchProduce: "उत्पादन, बियाणे, साधने शोधा...",
    addToCart: "कार्टमध्ये जोडा",
    inCart: "कार्टमध्ये",
    sample: "नमुना इन्व्हेंटरी",
    demo: "डेमो डेटा",
    save: "बदल जतन करा",
    send: "पाठवा",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    overview: "সংক্ষিপ্তসার",
    advisor: "ফসল পরামর্শদাতা",
    marketplace: "মার্কেটপ্লেস",
    assistant: "AI সহায়ক",
    orders: "অর্ডার",
    settings: "সেটিংস",
    signIn: "সাইন ইন",
    farmer: "কৃষক লগইন",
    customer: "ক্রেতা লগইন",
    fullName: "পুরো নাম",
    phone: "মোবাইল নম্বর",
    otp: "ওয়ান-টাইম পাসকোড",
    requestOtp: "OTP পাঠান",
    verify: "যাচাই করে এগিয়ে যান",
    continueLabel: "এগিয়ে যান",
    developmentOtp: "ডেভেলপমেন্ট OTP মোড",
    developmentOtpDetail: "SMS সংযুক্ত নয়। প্রিভিউয়ের জন্য 2846 কোড ব্যবহার করুন।",
    chooseJourney: "আপনার AgriSense যাত্রা বেছে নিন",
    chooseJourneyDetail: "ভালো ফলন, ন্যায্য বিক্রি এবং খামার থেকে কেনার এক workspace।",
    nextMove: "আপনার পরবর্তী সেরা মাঠের পদক্ষেপ",
    viewPlan: "পরিকল্পনা দেখুন",
    askAssistant: "ফিল্ড সহায়ককে জিজ্ঞাসা করুন",
    searchProduce: "ফসল, বীজ, সরঞ্জাম খুঁজুন...",
    addToCart: "কার্টে যোগ করুন",
    inCart: "কার্টে আছে",
    sample: "নমুনা ইনভেন্টরি",
    demo: "ডেমো ডেটা",
    save: "পরিবর্তন সংরক্ষণ করুন",
    send: "পাঠান",
  },
  gu: {
    dashboard: "ડેશબોર્ડ",
    overview: "ઝાંખી",
    advisor: "પાક સલાહકાર",
    marketplace: "માર્કેટપ્લેસ",
    assistant: "AI સહાયક",
    orders: "ઓર્ડર",
    settings: "સેટિંગ્સ",
    signIn: "સાઇન ઇન",
    farmer: "ખેડૂત લૉગિન",
    customer: "ગ્રાહક લૉગિન",
    fullName: "પૂરું નામ",
    phone: "મોબાઇલ નંબર",
    otp: "વન-ટાઇમ પાસકોડ",
    requestOtp: "OTP મોકલો",
    verify: "ચકાસી આગળ વધો",
    continueLabel: "આગળ વધો",
    developmentOtp: "ડેવલપમેન્ટ OTP મોડ",
    developmentOtpDetail: "SMS જોડાયેલ નથી. પ્રિવ્યૂ માટે 2846 કોડ વાપરો.",
    chooseJourney: "તમારો AgriSense પ્રવાસ પસંદ કરો",
    chooseJourneyDetail: "સારી ખેતી, વાજબી વેચાણ અને ખેતરથી ખરીદી માટે એક જગ્યા.",
    nextMove: "તમારું આગલું શ્રેષ્ઠ ખેતર પગલું",
    viewPlan: "પ્લાન જુઓ",
    askAssistant: "ફીલ્ડ સહાયકને પૂછો",
    searchProduce: "ઉપજ, બીજ, સાધનો શોધો...",
    addToCart: "કાર્ટમાં ઉમેરો",
    inCart: "કાર્ટમાં",
    sample: "નમૂના ઇન્વેન્ટરી",
    demo: "ડેમો ડેટા",
    save: "ફેરફારો સાચવો",
    send: "મોકલો",
  },
  pa: {
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    overview: "ਝਲਕ",
    advisor: "ਫਸਲ ਸਲਾਹਕਾਰ",
    marketplace: "ਮਾਰਕੀਟਪਲੇਸ",
    assistant: "AI ਸਹਾਇਕ",
    orders: "ਆਰਡਰ",
    settings: "ਸੈਟਿੰਗਾਂ",
    signIn: "ਸਾਈਨ ਇਨ",
    farmer: "ਕਿਸਾਨ ਲੌਗਇਨ",
    customer: "ਗਾਹਕ ਲੌਗਇਨ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    phone: "ਮੋਬਾਈਲ ਨੰਬਰ",
    otp: "ਵਨ-ਟਾਈਮ ਪਾਸਕੋਡ",
    requestOtp: "OTP ਭੇਜੋ",
    verify: "ਤਸਦੀਕ ਕਰਕੇ ਜਾਰੀ ਰੱਖੋ",
    continueLabel: "ਜਾਰੀ ਰੱਖੋ",
    developmentOtp: "ਡਿਵੈਲਪਮੈਂਟ OTP ਮੋਡ",
    developmentOtpDetail: "SMS ਜੁੜਿਆ ਨਹੀਂ ਹੈ। ਪ੍ਰੀਵਿਊ ਲਈ 2846 ਕੋਡ ਵਰਤੋ।",
    chooseJourney: "ਆਪਣਾ AgriSense ਸਫ਼ਰ ਚੁਣੋ",
    chooseJourneyDetail: "ਚੰਗਾ ਉਗਾਉਣ, ਵਾਜਬ ਵੇਚਣ ਅਤੇ ਖੇਤ ਤੋਂ ਖਰੀਦਣ ਲਈ ਇੱਕ ਥਾਂ।",
    nextMove: "ਤੁਹਾਡਾ ਅਗਲਾ ਵਧੀਆ ਖੇਤ ਕਦਮ",
    viewPlan: "ਪਲਾਨ ਵੇਖੋ",
    askAssistant: "ਫੀਲਡ ਸਹਾਇਕ ਨੂੰ ਪੁੱਛੋ",
    searchProduce: "ਉਪਜ, ਬੀਜ, ਸੰਦ ਲੱਭੋ...",
    addToCart: "ਕਾਰਟ ਵਿੱਚ ਪਾਓ",
    inCart: "ਕਾਰਟ ਵਿੱਚ",
    sample: "ਨਮੂਨਾ ਇਨਵੈਂਟਰੀ",
    demo: "ਡੈਮੋ ਡੇਟਾ",
    save: "ਤਬਦੀਲੀਆਂ ਸੰਭਾਲੋ",
    send: "ਭੇਜੋ",
  },
};

const produce = [
  { id: 1, name: "Bengaluru tomatoes", farmer: "Lakshmi Farms", price: "₹32", unit: "/ kg", location: "Kolar, KA", color: "tomato", emoji: "🍅", image: "/manus-storage/async-images/6ryBmWjGq48gQsTGZj1KS8/image-1.webp", freshness: "Harvested today" },
  { id: 2, name: "Sona masuri rice", farmer: "Rao Organics", price: "₹68", unit: "/ kg", location: "Warangal, TS", color: "rice", emoji: "🌾", image: "/manus-storage/async-images/6ryBmWjGq48gQsTGZj1KS8/image-2.webp", freshness: "2 days ago" },
  { id: 3, name: "Alphonso mangoes", farmer: "Konkan Collective", price: "₹240", unit: "/ box", location: "Ratnagiri, MH", color: "mango", emoji: "🥭", image: "/manus-storage/async-images/6ryBmWjGq48gQsTGZj1KS8/image-3.webp", freshness: "Limited harvest" },
  { id: 4, name: "Coriander greens", farmer: "Meera’s Garden", price: "₹18", unit: "/ bunch", location: "Nashik, MH", color: "greens", emoji: "🌿", image: "/manus-storage/async-images/6ryBmWjGq48gQsTGZj1KS8/image-4.webp", freshness: "Harvested today" },
];

const storeProducts = [
  { id: 5, name: "Native millet seed mix", category: "Seeds", price: "₹890", detail: "1 kg · climate resilient", icon: "🌱" },
  { id: 6, name: "Drip starter kit", category: "Irrigation", price: "₹2,450", detail: "For up to 1 acre", icon: "💧" },
  { id: 7, name: "Neem-based soil tonic", category: "Fertilizers", price: "₹580", detail: "500 ml · sample product", icon: "🪴" },
  { id: 8, name: "NPK 19:19:19 blend", category: "Fertilizers", price: "₹1,240", detail: "5 kg · balanced nutrients", icon: "🧺" },
  { id: 9, name: "Bio-trichoderma powder", category: "Crop protection", price: "₹420", detail: "1 kg · biological support", icon: "🛡️" },
  { id: 10, name: "Hand sprayer · 16 L", category: "Tools", price: "₹1,150", detail: "Manual farm sprayer", icon: "🧰" },
  { id: 11, name: "Sticky pest trap pack", category: "Pesticides", price: "₹280", detail: "20 traps · demo inventory", icon: "🟨" },
];

const navIcon: Record<View, typeof Leaf> = {
  overview: Leaf,
  advisor: Sprout,
  health: ShieldCheck,
  market: ShoppingBag,
  assistant: MessageCircle,
  orders: Package,
  settings: Settings2,
};

function LanguageSelect({ language, onChange, compact = false }: { language: LanguageCode; onChange: (value: LanguageCode) => void; compact?: boolean }) {
  return (
    <label className={`language-select ${compact ? "compact" : ""}`}>
      <Globe2 size={16} />
      <select value={language} onChange={event => onChange(event.target.value as LanguageCode)} aria-label="Select language">
        {languageOptions.map(option => (
          <option value={option.code} key={option.code}>{compact ? option.native : `${option.native} · ${option.label}`}</option>
        ))}
      </select>
      <ChevronDown size={14} />
    </label>
  );
}

function Brand({ small = false }: { small?: boolean }) {
  return (
    <div className={`brand ${small ? "brand-small" : ""}`}>
      <span className="brand-mark"><Sprout size={small ? 17 : 20} strokeWidth={2.5} /></span>
      <span className="brand-wordmark"><strong>Agri</strong><em>Sense</em></span>
    </div>
  );
}

function RoleChooser({ language, copy, onLanguageChange, onChoose }: { language: LanguageCode; copy: Copy; onLanguageChange: (value: LanguageCode) => void; onChoose: (role: Role) => void }) {
  return (
    <div className="auth-page">
      <div className="auth-ambient ambient-one" />
      <div className="auth-ambient ambient-two" />
      <header className="auth-topbar"><Brand /><LanguageSelect language={language} onChange={onLanguageChange} /></header>
      <main className="auth-content">
        <div className="eyebrow"><span className="eyebrow-dot" /> {tr("farmIntelligence", "Farm intelligence, made human")}</div>
        <h1>{copy.chooseJourney}</h1>
        <p className="auth-lede">{copy.chooseJourneyDetail}</p>
        <div className="role-grid">
          <button className="role-card farmer-card" onClick={() => onChoose("farmer")}>
            <span className="role-icon"><Tractor size={26} /></span>
            <span className="role-card-title">{copy.farmer}</span>
            <span className="role-card-text">{tr("farmerDescription", "See your farm, make your next move, and sell closer to the source.")}</span>
            <span className="role-card-link">{tr("farmerWorkspace", "Enter farmer workspace")} <ArrowRight size={17} /></span>
          </button>
          <button className="role-card customer-card" onClick={() => onChoose("customer")}>
            <span className="role-icon"><ShoppingBag size={26} /></span>
            <span className="role-card-title">{copy.customer}</span>
            <span className="role-card-text">{tr("customerDescription", "Discover honest produce and useful farm essentials, direct from India’s growers.")}</span>
            <span className="role-card-link">{tr("exploreMarketplace", "Explore the marketplace")} <ArrowRight size={17} /></span>
          </button>
        </div>
        <div className="trust-row"><span><Check size={15} /> {tr("phoneFirst", "Phone-first access")}</span><span><Check size={15} /> {tr("indianLanguages", "10 Indian languages")}</span><span><Check size={15} /> {tr("builtForField", "Built for the field")}</span></div>
      </main>
      <footer className="auth-footer"><span>© 2026 AgriSense</span><span>Private by design · Provider connections are clearly labelled</span></footer>
    </div>
  );
}

function Login({ role, language, copy, onLanguageChange, onBack, onLogin }: { role: Role; language: LanguageCode; copy: Copy; onLanguageChange: (value: LanguageCode) => void; onBack: () => void; onLogin: (name: string) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const isFarmer = role === "farmer";
  const submit = () => {
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) return setError(tr("invalidMobile", "Add your name and a valid 10-digit mobile number."));
    if (!otpSent) return setOtpSent(true);
    if (otp !== "2846") return setError(tr("codeMismatch", "That code did not match. In development mode, use 2846."));
    onLogin(name.trim());
  };
  return (
    <div className="auth-page login-page">
      <header className="auth-topbar"><button className="back-button" onClick={onBack}>← Back</button><Brand /><LanguageSelect language={language} onChange={onLanguageChange} /></header>
      <main className="login-layout">
        <div className="login-story">
          <div className="eyebrow"><span className="eyebrow-dot" /> {isFarmer ? tr("farmWorkspace", "Your farm workspace") : tr("directFromField", "Direct from the field")}</div>
          <h1>{isFarmer ? tr("farmerStoryTitle", "Your field, a little clearer.") : tr("customerStoryTitle", "Good food starts with a good source.")}</h1>
          <p>{isFarmer ? tr("farmerStory", "Bring weather, soil, crop decisions, and market movement into one calm daily view.") : tr("customerStory", "Browse what is growing now, meet the people behind it, and keep more value in the farming community.")}</p>
          <div className="story-note"><span className="note-icon">✦</span><div><strong>{isFarmer ? tr("nextFieldDecision", "Designed for the next field decision") : tr("provenance", "A marketplace with provenance")}</strong><small>{isFarmer ? tr("noPassword", "No email or password required. Your phone is your key.") : tr("everyListing", "Every sample listing shows its farm, place, unit, and freshness.")}</small></div></div>
        </div>
        <div className="login-card">
          <div className="login-card-header"><span className={`role-chip ${role}`}>{isFarmer ? <Tractor size={15} /> : <ShoppingBag size={15} />}{isFarmer ? copy.farmer : copy.customer}</span><span className="secure-label"><span className="secure-dot" /> Secure access</span></div>
          <h2>{copy.signIn}</h2>
          <p className="muted">{tr("enterNamePhone", "Enter your name and mobile number to get started.")}</p>
          <div className="field-stack">
            <label>{copy.fullName}<input value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Anika Reddy" autoComplete="name" /></label>
            <label>{copy.phone}<div className="phone-field"><span>+91</span><input value={phone} onChange={event => setPhone(event.target.value.replace(/[^0-9]/g, "").slice(0, 10))} placeholder="10-digit mobile number" inputMode="numeric" /></div></label>
            {otpSent && <label>{copy.otp}<input value={otp} onChange={event => setOtp(event.target.value.replace(/[^0-9]/g, "").slice(0, 4))} placeholder="4-digit code" inputMode="numeric" autoFocus /></label>}
          </div>
          {otpSent && <div className="dev-otp"><div className="dev-otp-title"><Zap size={15} /> {copy.developmentOtp}</div><div>{copy.developmentOtpDetail}</div></div>}
          {error && <div className="form-error">{error}</div>}
          <button className="primary-button full-width" onClick={submit}>{otpSent ? copy.verify : copy.requestOtp}<ArrowRight size={17} /></button>
          <p className="login-legal">{tr("acceptedTerms", "By continuing you agree to the AgriSense terms. Your role is saved securely with your phone verification.")}</p>
        </div>
      </main>
    </div>
  );
}

function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "slate" }) {
  return <span className={`status-pill ${tone}`}><span className="status-dot" />{children}</span>;
}

function DataTag({ children, tone = "demo" }: { children: React.ReactNode; tone?: "demo" | "entered" | "live" }) {
  return <span className={`data-tag ${tone}`}><span />{children}</span>;
}

function Shell({ role, language, copy, name, view, onView, onLanguageChange, onLogout, cartCount, children }: { role: Role; language: LanguageCode; copy: Copy; name: string; view: View; onView: (view: View) => void; onLanguageChange: (value: LanguageCode) => void; onLogout: () => void; cartCount: number; children: React.ReactNode }) {
  const isFarmer = role === "farmer";
  const nav: Array<{ view: View; label: string; badge?: number }> = isFarmer
    ? [{ view: "overview", label: copy.overview }, { view: "advisor", label: copy.advisor }, { view: "health", label: tr("fieldHealth", "Field health") }, { view: "market", label: copy.marketplace }, { view: "assistant", label: copy.assistant }]
    : [{ view: "market", label: copy.marketplace }, { view: "orders", label: copy.orders }, { view: "assistant", label: copy.assistant }];
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-head"><Brand small /><button className="sidebar-collapse" aria-label="Collapse navigation"><PanelLeft size={17} /></button></div>
        <div className="workspace-switcher"><span className="avatar avatar-green">{name.slice(0, 1).toUpperCase()}</span><span><strong>{name || (isFarmer ? "Anika Reddy" : "Priya Shah")}</strong><small>{isFarmer ? "Farmer workspace" : "Customer workspace"}</small></span><ChevronDown size={15} /></div>
        <div className="side-label">{copy.dashboard}</div>
        <nav className="side-nav">{nav.map(item => { const Icon = navIcon[item.view]; return <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => onView(item.view)}><Icon size={18} /><span>{item.label}</span>{item.view === "market" && cartCount > 0 && <b className="nav-badge">{cartCount}</b>}</button>; })}</nav>
        <div className="side-label secondary-label">{tr("workspace", "Workspace")}</div>
        <nav className="side-nav"><button className={view === "settings" ? "active" : ""} onClick={() => onView("settings")}><Settings2 size={18} /><span>{copy.settings}</span></button><button onClick={() => onView("assistant")}><CircleHelp size={18} /><span>{tr("helpCenter", "Help center")}</span></button></nav>
        <div className="sidebar-bottom"><div className="weather-mini"><Sun size={18} /><div><strong>{tr("clearWeather", "28° · Clear")}</strong><span>{tr("weatherConditions", "Farm conditions · Demo")}</span></div></div><button className="profile-mini" onClick={() => onView("settings")}><span className="avatar avatar-amber">{name.slice(0, 1).toUpperCase()}</span><span><strong>{name}</strong><small>{isFarmer ? "+91 98765 43210" : "Customer account"}</small></span><ChevronDown size={15} /></button></div>
      </aside>
      <div className="main-column">
        <header className="app-topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumb"><span>{isFarmer ? tr("myFarm", "My farm") : tr("marketWorkspace", "AgriSense market")}</span><span>/</span><strong>{view === "overview" ? copy.overview : view === "advisor" ? copy.advisor : view === "health" ? tr("fieldHealth", "Field health") : view === "market" ? copy.marketplace : view === "assistant" ? copy.assistant : view === "orders" ? copy.orders : copy.settings}</strong></div><div className="top-actions"><LanguageSelect language={language} onChange={onLanguageChange} compact /><button className="icon-button"><Bell size={19} /><span className="notification-dot" /></button><button className="top-avatar" onClick={() => onView("settings")}>{name.slice(0, 1).toUpperCase()}</button></div></header>
        <main className="content-area">{children}</main>
        <div className="mobile-nav">{nav.slice(0, 4).map(item => { const Icon = navIcon[item.view]; return <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => onView(item.view)}><Icon size={19} /><span>{item.label.split(" ")[0]}</span></button>; })}</div>
      </div>
    </div>
  );
}

function FarmerOverview({ copy, name, onView }: { copy: Copy; name: string; onView: (view: View) => void }) {
  return <div className="page-stack">
    <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> Wednesday, 24 June 2026</div><h1>{tr("goodMorning", "Good morning")}, {name.split(" ")[0] || "Anika"}.</h1><p>{tr("todayPicture", "Here’s the picture around your farm today.")}</p></div><button className="secondary-button" onClick={() => onView("settings")}><MapPin size={16} /> Kolar, Karnataka <ChevronDown size={15} /></button></div>
    <div className="insight-banner"><div className="banner-copy"><span className="banner-kicker"><Zap size={14} /> {copy.nextMove}</span><h2>{tr("holdIrrigation", "Hold irrigation for 18 hours.")}</h2><p>{tr("rainDetail", "Light rain is expected tonight. Your tomato beds are at ")}<strong>61% soil moisture</strong>, so let the rain do the work before the next watering window.</p><button className="text-button" onClick={() => onView("advisor")}>{copy.viewPlan} <ArrowRight size={16} /></button></div><div className="banner-visual"><div className="sun-orb"><Sun size={34} /></div><div className="rain-line line-a" /><div className="rain-line line-b" /><CloudRain className="cloud-icon" size={52} /></div></div>
    <div className="stat-grid"><div className="stat-card"><div className="stat-card-top"><span className="stat-icon green"><Droplets size={18} /></span><DataTag>{tr("demoReading", "Demo reading")}</DataTag></div><strong>61%</strong><span>{tr("soilMoisture", "Soil moisture")}</span><div className="mini-progress"><i style={{ width: "61%" }} /></div><small>{tr("goodTomatoes", "Good for tomatoes")}</small></div><div className="stat-card"><div className="stat-card-top"><span className="stat-icon amber"><Sun size={18} /></span><DataTag tone="live">{tr("apiNotConnected", "API not connected")}</DataTag></div><strong>28°</strong><span>{tr("currentTemperature", "Current temperature")}</span><div className="stat-trend"><TrendingUp size={15} /> +2° from yesterday</div><small>{tr("browserLocation", "Kolar · browser location")}</small></div><div className="stat-card"><div className="stat-card-top"><span className="stat-icon blue"><Wheat size={18} /></span><DataTag tone="entered">{tr("farmerEntered", "Farmer entered")}</DataTag></div><strong>3</strong><span>{tr("activeCrops", "Active crops")}</span><div className="crop-dots"><i /><i /><i /></div><small>Tomato · finger millet · beans</small></div><div className="stat-card"><div className="stat-card-top"><span className="stat-icon violet"><LineChart size={18} /></span><DataTag>{tr("demoMarket", "Demo market")}</DataTag></div><strong>+8.4%</strong><span>{tr("bestPriceMovement", "Best price movement")}</span><div className="stat-trend positive"><TrendingUp size={15} /> Tomatoes this week</div><small>{tr("nearbyMarket", "Nearby market view")}</small></div></div>
    <section className="prediction-center panel"><div className="prediction-center-heading"><div><span className="panel-kicker">{tr("predictionCenter", "Prediction center")}</span><h3>{tr("predictionCenterSubtitle", "Turn the next weather shift or crop-health signal into a clear field action.")}</h3></div><span className="data-tag"><span /> {tr("demoSignal", "Demo signal")}</span></div><div className="prediction-center-grid"><article className="prediction-action weather-action"><div className="prediction-action-icon"><CloudRain size={22} /></div><div className="prediction-action-copy"><strong>{tr("weatherPrediction", "Weather prediction")}</strong><p>{tr("weatherPredictionDetail", "Location-based forecast with rainfall and irrigation guidance.")}</p><span>{tr("locationBased", "Location-based")} · 28° · 64% humidity</span></div><button className="text-button" onClick={() => onView("health")}>{tr("openWeatherPrediction", "Open weather prediction")} <ArrowRight size={15} /></button></article><article className="prediction-action disease-action"><div className="prediction-action-icon"><ShieldCheck size={22} /></div><div className="prediction-action-copy"><strong>{tr("earlyDiseasePrediction", "Early disease prediction")}</strong><p>{tr("earlyDiseasePredictionDetail", "Screen leaf symptoms early and open a safe containment plan.")}</p><span>{tr("screening", "Screening")} · {tr("screeningPending", "Screening pending")}</span></div><button className="text-button" onClick={() => onView("health")}>{tr("openDiseasePrediction", "Open disease prediction")} <ArrowRight size={15} /></button></article></div></section>
    <div className="content-grid two-thirds"><section className="panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("fieldPulse", "Field pulse")}</span><h3>{tr("whatNeedsAttention", "What needs your attention")}</h3></div><button className="icon-button small"><ChevronDown size={17} /></button></div><div className="task-list"><div className="task-item priority"><span className="task-check"><Check size={14} /></span><div><strong>{tr("checkLeaves", "Check tomato leaf undersides")}</strong><span>{tr("dueTodayWalk", "Due today · 2 min walk")}</span></div><StatusPill tone="amber">{tr("priority", "Priority")}</StatusPill></div><div className="task-item"><span className="task-check"><Check size={14} /></span><div><strong>{tr("logSoil", "Log morning soil reading")}</strong><span>{tr("dueTodayManual", "Due today · Entered manually")}</span></div><StatusPill>{tr("ready", "Ready")}</StatusPill></div><div className="task-item"><span className="task-check empty" /><div><strong>{tr("reviewMarket", "Review market price for beans")}</strong><span>{tr("beforeHarvest", "Before Friday harvest")}</span></div><ArrowRight size={17} className="task-arrow" /></div></div><button className="panel-link" onClick={() => onView("assistant")}>Ask the field assistant <ArrowRight size={16} /></button></section><section className="panel soil-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("soilNutrients", "Soil & nutrients")}</span><h3>{tr("enoughSignal", "One glance, enough signal")}</h3></div><DataTag tone="entered">Kolar plot A</DataTag></div><div className="soil-chart"><div className="soil-y-axis"><span>{tr("high", "High")}</span><span>{tr("mid", "Mid")}</span><span>{tr("low", "Low")}</span></div><div className="bars"><div className="bar-group"><div className="bar bar-green" style={{ height: "74%" }} /><span>N</span></div><div className="bar-group"><div className="bar bar-lime" style={{ height: "51%" }} /><span>P</span></div><div className="bar-group"><div className="bar bar-amber" style={{ height: "65%" }} /><span>K</span></div><div className="bar-group"><div className="bar bar-blue" style={{ height: "61%" }} /><span>Moisture</span></div></div></div><div className="soil-legend"><span><i className="dot-green" /> Balanced</span><span>pH 6.4</span><span>{tr("updatedTime", "Updated 8:20 AM")}</span></div></section></div>
    <div className="content-grid three-columns"><section className="panel crop-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("growingNow", "Growing now")}</span><h3>{tr("cropBoard", "Your crop board")}</h3></div><button className="text-button" onClick={() => onView("advisor")}>Manage <ArrowRight size={15} /></button></div><div className="crop-row"><span className="crop-illustration tomato-illustration">🍅</span><div><strong>Tomatoes</strong><span>{tr("flowering", "Flowering · 42 days")}</span></div><div className="crop-score"><strong>78%</strong><span>{tr("onTrack", "on track")}</span></div></div><div className="crop-row"><span className="crop-illustration millet-illustration">🌾</span><div><strong>Finger millet</strong><span>{tr("vegetative", "Vegetative · 28 days")}</span></div><div className="crop-score"><strong>64%</strong><span>{tr("onTrack", "on track")}</span></div></div><div className="crop-row"><span className="crop-illustration bean-illustration">🌿</span><div><strong>French beans</strong><span>{tr("harvestWindow", "Harvest window · 5 days")}</span></div><div className="crop-score"><strong>92%</strong><span>{tr("onTrack", "on track")}</span></div></div></section><section className="panel alert-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("weatherWatch", "Weather watch")}</span><h3>{tr("planRain", "Plan around rain")}</h3></div><BellRing size={18} className="panel-heading-icon" /></div><div className="weather-main"><CloudRain size={32} /><div><strong>{tr("rainLikely", "Rain likely tonight")}</strong><span>{tr("rainWindow", "18 mm · 9:00 PM–1:00 AM")}</span></div></div><div className="weather-impact"><span className="impact-icon"><Droplets size={15} /></span><span>{tr("skipIrrigation", "Skip one irrigation cycle to protect root health.")}</span></div><div className="provider-note"><span className="status-dot amber-dot" /> Demonstration forecast · connect a weather API for live conditions</div></section><section className="panel history-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("recentIntelligence", "Recent intelligence")}</span><h3>{tr("decisionHistory", "Decision history")}</h3></div><button className="icon-button small"><ArrowRight size={17} /></button></div><div className="history-list"><div><span className="history-icon"><LineChart size={15} /></span><span><strong>{tr("cropAdvisor", "Crop advisor")}</strong><small>{tr("rankedHistory", "3 ranked options · 21 Jun")}</small></span><StatusPill>{tr("saved", "Saved")}</StatusPill></div><div><span className="history-icon"><UploadCloud size={15} /></span><span><strong>{tr("leafAnalysis", "Leaf analysis")}</strong><small>{tr("modelUnavailable", "Model unavailable · 19 Jun")}</small></span><StatusPill tone="amber">{tr("review", "Review")}</StatusPill></div><div><span className="history-icon"><ShoppingBag size={15} /></span><span><strong>{tr("marketWatch", "Market watch")}</strong><small>Tomatoes · 18 Jun</small></span><StatusPill>{tr("saved", "Saved")}</StatusPill></div></div></section></div>
  </div>;
}

function Advisor({ copy }: { copy: Copy }) {
  const [ran, setRan] = useState(false);
  return <div className="page-stack"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> Transparent agronomy</div><h1>{copy.advisor}</h1><p>Start with the measurements you have. AgriSense explains the trade-offs behind every suggestion.</p></div><DataTag>{tr("ruleBasedDemo", "Rule-based demo")}</DataTag></div><div className="advisor-layout"><section className="panel advisor-form"><div className="panel-heading"><div><span className="panel-kicker">{tr("stepFieldContext", "Step 01 · Field context")}</span><h3>{tr("tellPlot", "Tell us about this plot")}</h3></div><span className="step-count">1 / 2</span></div><div className="form-grid"><label>{tr("soilType", "Soil type")}<select defaultValue="red"><option value="red">{tr("redLoam", "Red loam")}</option><option value="black">{tr("blackSoil", "Black soil")}</option><option value="alluvial">{tr("alluvial", "Alluvial")}</option><option value="sandy">{tr("sandyLoam", "Sandy loam")}</option></select></label><label>Soil pH<div className="input-with-suffix"><input defaultValue="6.4" /><span>pH</span></div></label><label>Nitrogen<div className="input-with-suffix"><input defaultValue="74" /><span>kg/ha</span></div></label><label>Phosphorus<div className="input-with-suffix"><input defaultValue="38" /><span>kg/ha</span></div></label><label>Potassium<div className="input-with-suffix"><input defaultValue="52" /><span>kg/ha</span></div></label><label>{tr("waterAccess", "Water access")}<select defaultValue="drip"><option value="drip">{tr("dripIrrigation", "Drip irrigation")}</option><option value="borewell">{tr("borewell", "Borewell")}</option><option value="rain">{tr("rainFed", "Rain-fed")}</option><option value="canal">{tr("canal", "Canal")}</option></select></label></div><div className="form-divider" /><div className="panel-heading compact-heading"><div><span className="panel-kicker">{tr("stepSeasonSignals", "Step 02 · Season signals")}</span><h3>{tr("conditionsMonth", "Conditions this month")}</h3></div></div><div className="form-grid"><label>{tr("averageTemperature", "Average temperature")}<div className="input-with-suffix"><input defaultValue="27" /><span>°C</span></div></label><label>{tr("rainfallOutlook", "Rainfall outlook")}<div className="input-with-suffix"><input defaultValue="84" /><span>mm</span></div></label><label>Season<select defaultValue="kharif"><option value="kharif">Kharif · Jun–Oct</option><option value="rabi">Rabi · Nov–Mar</option><option value="zaid">Zaid · Mar–Jun</option></select></label><label>{tr("location", "Location")}<div className="input-with-icon"><MapPin size={16} /><input defaultValue="Kolar, Karnataka" /></div></label></div><button className="primary-button full-width advisor-run" onClick={() => setRan(true)}>{ran ? <><Check size={17} /> Recommendation updated</> : <>Run crop recommendation <ArrowRight size={17} /></>}</button><p className="form-footnote">{tr("missingMeasurement", "Missing a measurement? That is okay. Recommendations will show what would make the result more reliable.")}</p></section><section className="advisor-results"><div className="result-header"><div><span className="panel-kicker">{tr("rankedOptions", "Your ranked options")}</span><h3>{ran ? tr("threeCrops", "Three crops fit the field") : tr("readyWhenYouAre", "Ready when you are")}</h3></div><StatusPill tone={ran ? "green" : "slate"}>{ran ? "3 suggestions" : "Awaiting inputs"}</StatusPill></div>{ran ? <><div className="recommendation-card top"><div className="rank">01</div><div className="recommendation-icon">🌾</div><div className="recommendation-copy"><strong>Finger millet</strong><span>Best fit · low water demand</span><p>Matches your red loam, current pH, and rain outlook. It tolerates short dry spells and suits your existing harvest window.</p><div className="tag-row"><span>Water-light</span><span>pH aligned</span><span>Kharif</span></div></div><div className="fit-score"><strong>{tr("high", "High")}</strong><span>rule fit</span></div></div><div className="recommendation-card"><div className="rank">02</div><div className="recommendation-icon">🥜</div><div className="recommendation-copy"><strong>Groundnut</strong><span>Strong fit · nutrient opportunity</span><p>Good seasonal match. Add a soil organic-carbon reading before committing to the full plot.</p><div className="tag-row"><span>Marketable</span><span>Needs carbon reading</span></div></div><div className="fit-score medium"><strong>Good</strong><span>rule fit</span></div></div><div className="recommendation-card"><div className="rank">03</div><div className="recommendation-icon">🌻</div><div className="recommendation-copy"><strong>Sunflower</strong><span>Possible · watch water timing</span><p>Works with the season, but flowering will need consistent moisture if rain arrives late.</p><div className="tag-row"><span>Deep root</span><span>Monitor moisture</span></div></div><div className="fit-score low"><strong>Watch</strong><span>rule fit</span></div></div><div className="explain-note"><CircleHelp size={16} /><span>These are transparent agronomic rules for a demo experience, not a measured probability or guaranteed yield.</span></div></> : <div className="empty-result"><span className="empty-orb"><Sprout size={27} /></span><strong>{tr("recommendationsExplainable", "Recommendations stay explainable")}</strong><p>Enter the field conditions on the left to see water needs, constraints, and missing measurements—not just a crop name.</p></div>}</section></div></div>;
}

function Marketplace({ copy, onAdd, onClearCart, cartCount, role }: { copy: Copy; onAdd: () => void; onClearCart: () => void; cartCount: number; role: Role }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All produce");
  const [ownListings, setOwnListings] = useState<Array<{ id: number; name: string; farmer: string; price: string; unit: string; location: string; color: string; emoji: string; image: string; freshness: string }>>(() => { try { return JSON.parse(localStorage.getItem("agrisense-own-listings") || "[]"); } catch { return []; } });
  const [listing, setListing] = useState({ name: "", quantity: "", unit: "kg", price: "", location: "Kolar, Karnataka" });
  useEffect(() => { localStorage.setItem("agrisense-own-listings", JSON.stringify(ownListings)); }, [ownListings]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const allProduce = [...produce, ...ownListings];
  const filtered = allProduce.filter(item => `${item.name} ${item.farmer} ${item.location}`.toLowerCase().includes(query.toLowerCase()) && (category === "All produce" || (category === "Fresh harvest" && item.freshness.includes("today")) || (category === "Grains" && item.name.toLowerCase().includes("rice"))));
  const publishListing = () => {
    if (!listing.name.trim() || !listing.quantity.trim() || !listing.price.trim()) return;
    setOwnListings(items => [...items, { id: Date.now(), name: listing.name.trim(), farmer: "Your farm", price: `₹${listing.price}`, unit: `/ ${listing.unit} · ${listing.quantity} ${listing.unit}`, location: listing.location.trim() || "Your farm", color: "greens", emoji: "🌱", image: "", freshness: "Just listed" }]);
    setListing({ name: "", quantity: "", unit: "kg", price: "", location: "Kolar, Karnataka" });
  };
  return <div className="page-stack"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> {tr("farmerMarketplace", "Farmer-to-customer marketplace")}</div><h1>{copy.marketplace}</h1><p>{role === "farmer" ? tr("sellToCommunity", "Sell your harvest directly, with clear quantity, price, and source details.") : tr("knowSource", "Know the farm, the place, and the harvest window before you buy.")}</p></div><button className="secondary-button cart-button" onClick={() => setCartOpen(open => !open)}><ShoppingCart size={17} /> {tr("cart", "Cart")} <span>{cartCount}</span></button></div>{cartOpen && <section className="panel cart-summary-panel">{orderPlaced ? <div className="order-success"><span className="order-success-icon"><Check size={20} /></span><div><strong>{tr("orderPlaced", "Order placed successfully")}</strong><p>{tr("orderPlacedDetail", "Your test order is ready. Delivery and payment remain clearly marked as demo states.")}</p></div><button className="secondary-button" onClick={() => { onClearCart(); setOrderPlaced(false); setCartOpen(false); }}>{tr("continueShopping", "Continue shopping")}</button></div> : cartCount > 0 ? <><div className="cart-summary-heading"><div><span className="panel-kicker">{tr("yourCart", "Your cart")}</span><h3>{tr("readyToOrder", "Ready to place your order")}</h3></div><DataTag>{cartCount} {tr("items", "items")}</DataTag></div><div className="cart-line"><span className="cart-line-icon">🛒</span><div><strong>{tr("marketplaceSelection", "Marketplace selection")}</strong><small>{cartCount} {tr("itemsFromFarmers", "items from verified sample farmers")}</small></div><b>₹{cartCount * 128}</b></div><div className="cart-total"><span>{tr("estimatedTotal", "Estimated total")}</span><strong>₹{cartCount * 128}</strong></div><button className="primary-button place-order-button" onClick={() => setOrderPlaced(true)}>{tr("placeOrder", "Place order")} <ArrowRight size={16} /></button></> : <div className="cart-empty"><ShoppingCart size={22} /><strong>{tr("cartEmpty", "Your cart is empty")}</strong><p>{tr("cartEmptyDetail", "Add produce or farm supplies to see them here and place an order.")}</p></div>}</section>}{role === "farmer" && <section className="panel sell-panel"><div className="sell-panel-heading"><div><span className="panel-kicker">{tr("sellYourCrop", "Sell your crop")}</span><h3>{tr("createListing", "Create a harvest listing")}</h3><p>{tr("listingHelp", "Add the basics customers need to buy with confidence.")}</p></div><span className="sell-badge"><Tractor size={15} /> {tr("farmerOnly", "Farmer workspace")}</span></div><div className="sell-form"><label>{tr("cropName", "Crop name")}<input value={listing.name} onChange={event => setListing({ ...listing, name: event.target.value })} placeholder="e.g. Fresh tomatoes" /></label><label>{tr("quantity", "Quantity")}<div className="input-with-suffix"><input value={listing.quantity} onChange={event => setListing({ ...listing, quantity: event.target.value.replace(/[^0-9.]/g, "") })} placeholder="100" inputMode="decimal" /><select value={listing.unit} onChange={event => setListing({ ...listing, unit: event.target.value })}><option value="kg">kg</option><option value="quintal">quintal</option><option value="box">box</option><option value="bunch">bunch</option></select></div></label><label>{tr("pricePerUnit", "Price per unit")}<div className="input-with-suffix"><span>₹</span><input value={listing.price} onChange={event => setListing({ ...listing, price: event.target.value.replace(/[^0-9.]/g, "") })} placeholder="32" inputMode="decimal" /></div></label><label>{tr("listingLocation", "Location")}<div className="input-with-icon"><MapPin size={16} /><input value={listing.location} onChange={event => setListing({ ...listing, location: event.target.value })} /></div></label><button className="primary-button sell-submit" onClick={publishListing}><Leaf size={16} /> {tr("publishListing", "Publish listing")}</button></div>{ownListings.length > 0 && <div className="own-listings"><div className="own-listings-heading"><strong>{tr("yourListings", "Your active listings")}</strong><span>{ownListings.length} {tr("published", "published")}</span></div>{ownListings.map(item => <div className="own-listing" key={item.id}><span className="own-listing-icon">{item.emoji}</span><div><strong>{item.name}</strong><small>{item.unit} · {item.location}</small></div><b>{item.price}</b><button className="quiet-danger" onClick={() => setOwnListings(items => items.filter(listingItem => listingItem.id !== item.id))}>{tr("removeListing", "Remove")}</button></div>)}</div>}</section>}<div className="market-toolbar"><div className="search-field"><Search size={18} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.searchProduce} /></div><div className="filter-pills">{[["All produce", tr("allProduce", "All produce")], ["Fresh harvest", tr("freshHarvest", "Fresh harvest")], ["Grains", tr("grains", "Grains")]].map(([value, label]) => <button key={value} className={category === value ? "selected" : ""} onClick={() => setCategory(value)}>{label}</button>)}<button><ChevronDown size={15} /> {tr("sort", "Sort")}</button></div></div><div className="market-note"><div><span className="note-icon small">✦</span><span><strong>{tr("sourceTrust", "What you see is what you can trust.")}</strong> Prices are sample data until verified farmer listings are connected.</span></div><DataTag>{tr("sampleListings", "Sample listings")}</DataTag></div><div className="produce-grid">{filtered.map(item => <article className="produce-card" key={item.id}><div className={`produce-photo ${item.color}`}>{item.image && <img src={item.image} alt={item.name} />}<span className="produce-emoji-fallback" aria-hidden="true">{item.emoji}</span><small>{item.freshness}</small><button className="save-favorite" aria-label={`Save ${item.name}`}>♡</button></div><div className="produce-body"><div className="produce-meta"><span>{item.location}</span><span>·</span><span>By {item.farmer}</span></div><h3>{item.name}</h3><div className="produce-price"><strong>{item.price}</strong><span>{item.unit}</span><button onClick={onAdd}>{role === "farmer" && item.farmer === "Your farm" ? tr("listed", "Listed") : copy.addToCart}</button></div><div className="produce-footer"><span><Check size={13} /> {tr("traceableSource", "Traceable source")}</span><span>{tr("availableUnits", "Available · 42 units")}</span></div></div></article>)}{filtered.length === 0 && <div className="empty-result market-empty"><Search size={22} /><strong>{tr("noMatch", "No produce matched that search")}</strong><p>{tr("trySearch", "Try a crop name, farmer, or location.")}</p></div>}</div><section className="store-section"><div className="section-heading"><div><span className="panel-kicker">{tr("inputStore", "AgriSense input store")}</span><h2>{tr("toolsSeasons", "Small tools, better seasons.")}</h2></div><button className="text-button">{tr("browseAll", "Browse all")} <ArrowRight size={16} /></button></div><div className="store-grid">{storeProducts.map(item => <article className="store-card" key={item.id}><span className="store-icon">{item.icon}</span><div><span className="store-category">{item.category}</span><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{item.price}</strong><button className="store-add-button" onClick={onAdd}><ShoppingCart size={14} /> {copy.addToCart}</button></article>)}</div></section></div>;
}
function Assistant({ copy, language }: { copy: Copy; language: LanguageCode }) {
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<{ lang: string; interimResults: boolean; continuous: boolean; start: () => void; stop: () => void; onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null; onend: (() => void) | null; onerror: (() => void) | null } | null>(null);
  const welcome = () => `${tr("goodMorning", "Good morning")}, Anika. ${tr("assistantWelcome", "I can help with crops, soil, irrigation, disease symptoms, weather risk, or the marketplace. What are you deciding today?")}`;
  const [messages, setMessages] = useState<Array<{ from: "assistant" | "user"; text: string }>>([{ from: "assistant", text: welcome() }]);
  useEffect(() => { setMessages([{ from: "assistant", text: welcome() }]); }, [language]);
  const answer = (query: string) => {
    const normalized = query.toLowerCase().trim();
    if (/weather|forecast|rain|temperature|humidity|मौसम|बारिश|वातावरण|వాతావరణ|వర్షం|வானிலை|மழை|ಹವಾಮಾನ|ಮಳೆ|കാലാവസ്ഥ|മഴ|हवामान|पाऊस|আবহাওয়া|বৃষ্টি|હવામાન|વરસાદ|ਮੌਸਮ|ਮੀਂਹ/.test(normalized)) return tr("assistantWeatherResponse", "For your selected location, the demo outlook is 28 degrees Celsius with 64 percent humidity and rain most likely on Friday. Hold one tomato irrigation cycle, check drainage before the wet morning, and open Field Health to change the location profile.");
    if (/irrigat|water|moisture|నీరు|सिंचाई|नमी|நீர்|ஈரம்|ನೀರು|ತೇವಾಂಶ|ജല|ഈർപ്പം|पाणी|ओलावा|জল|আর্দ্রতা|પાણી|ભેજ|ਸਿੰਚਾਈ|ਨਮੀ/.test(normalized)) return tr("assistantIrrigationResponse", "Your tomato beds show 61 percent soil moisture and light rain is expected tonight. Hold one irrigation cycle, then recheck the topsoil tomorrow morning. This is a cautious demo recommendation, so confirm it locally if the crop is visibly stressed.");
    if (/low.?water|dry|millet|crop|grow|कम पानी|सूखा|बाजरा|తక్కువ నీరు|పంట|ఏమి పండించ|குறைந்த நீர்|பயிர்|எதை வளர்க்க|ಕಡಿಮೆ ನೀರು|ಬೆಳೆ|ಏನು ಬೆಳೆಯ|കുറഞ്ഞ വെള്ളം|വിള|कमी पाणी|पीक|কম জল|ফসল|ઓછું પાણી|પાક|ਘੱਟ ਪਾਣੀ|ਫਸਲ/.test(normalized)) return tr("assistantLowWaterResponse", "Finger millet is a strong low-water option for this demo field. Groundnut can also fit, but check soil carbon, drainage, and market demand before committing the full plot.");
    if (/disease|leaf|spot|curl|yellow|pest|fungus|रोग|पत्ती|कीट|వ్యాధి|ఆకు|పురుగు|நோய்|இலை|பூச்சி|ರೋಗ|ಎಲೆ|ಕೀಟ|രോഗ|ഇല|കീടം|रोग|पान|किड|রোগ|পাতা|পোকা|રોગ|પાન|જીવાત|ਬਿਮਾਰੀ|ਪੱਤਾ|ਕੀੜੇ/.test(normalized)) return tr("assistantDiseaseResponse", "Upload a clear leaf image and select every visible symptom. The result is an early-warning signal, not a confirmed diagnosis: isolate affected plants, avoid spreading tools, remove severely affected leaves safely, and ask an agronomist before treatment.");
    if (/soil|ph|npk|nitrogen|phosphorus|potassium|मिट्टी|उर्वरक|मृदा|నేల|ఎరువు|மண்|உரம்|ಮಣ್ಣು|ಗೊಬ್ಬರ|മണ്ണ്|വളം|माती|खत|মাটি|সার|માટી|ખાતર|ਮਿੱਟੀ|ਖਾਦ/.test(normalized)) return tr("assistantSoilResponse", "For soil decisions, record pH plus nitrogen, phosphorus, potassium, and moisture together. Avoid adding fertilizer from one reading alone; compare the result with the selected crop and confirm missing measurements before applying anything.");
    if (/market|buy|sell|fertilizer|pesticide|sprayer|seed|कार्ट|खरीद|बेच|उर्वरक|कीटनाशक|बीज|మార్కెట్|కొను|అమ్ము|ఎరువు|పురుగుమందు|விதை|உரம்|பூச்சிக்கொல்லி|ಮಾರುಕಟ್ಟೆ|ಬೀಜ|ಗೊಬ್ಬರ|കീടനാശിനി|വിത്ത്|शेती|खत|রসায়ন|বীজ|બજાર|બીજ|ખાતર|ਮਾਰਕੀਟ|ਬੀਜ/.test(normalized)) return tr("assistantMarketplaceResponse", "Open Marketplace to compare sample produce and farm supplies. You can add seeds, fertilizers, crop-protection products, irrigation kits, and tools to the cart, then place a clearly labelled test order.");
    return tr("assistantGeneralResponse", "I can help with weather, irrigation, crop selection, soil pH and NPK, disease early warning, farm supplies, or Marketplace orders. Ask one specific farm question at a time for a clearer next step.");
  };
  const cleanForSpeech = (text: string) => text.replace(/[🌱🌦️💧🍃✅⚠️🛒]/gu, "").replace(/[*_#`]/g, "").replace(/\s+/g, " ").trim();
  const speak = (text: string) => { if (typeof window === "undefined" || !("speechSynthesis" in window)) return; const speech = window.speechSynthesis; speech.cancel(); const utterance = new SpeechSynthesisUtterance(cleanForSpeech(text)); utterance.lang = speechLocale[language]; utterance.rate = .88; utterance.pitch = 1; const voices = speech.getVoices(); const matchingVoice = voices.find(voice => voice.lang.toLowerCase().startsWith(language.toLowerCase())); if (matchingVoice) utterance.voice = matchingVoice; window.setTimeout(() => speech.speak(utterance), 80); };
  const send = (spokenText = message) => { const next = spokenText.trim(); if (!next) return; const response = answer(next); setMessages(items => [...items, { from: "user", text: next }, { from: "assistant", text: response }]); setMessage(""); speak(response); };
  const speechLocale: Record<LanguageCode, string> = { en: "en-IN", te: "te-IN", hi: "hi-IN", ta: "ta-IN", kn: "kn-IN", ml: "ml-IN", mr: "mr-IN", bn: "bn-IN", gu: "gu-IN", pa: "pa-IN" };
  const startVoiceInput = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = (window as typeof window & { SpeechRecognition?: new () => typeof recognitionRef.current; webkitSpeechRecognition?: new () => typeof recognitionRef.current }).SpeechRecognition || (window as typeof window & { webkitSpeechRecognition?: new () => typeof recognitionRef.current }).webkitSpeechRecognition;
    if (!SpeechRecognition) { setMessage(tr("voiceUnavailable", "Voice input is not supported in this browser. You can type your question instead.")); return; }
    if (listening) { recognitionRef.current?.stop(); setListening(false); return; }
    const recognition = new SpeechRecognition() as NonNullable<typeof recognitionRef.current>;
    recognition.lang = speechLocale[language]; recognition.interimResults = false; recognition.continuous = false;
    recognition.onresult = event => { const transcript = Array.from(event.results).map(result => result[0]?.transcript || "").join(" ").trim(); if (transcript) send(transcript); };
    recognition.onend = () => setListening(false); recognition.onerror = () => setListening(false); recognitionRef.current = recognition; setListening(true); recognition.start();
  };
  return <div className="page-stack assistant-page"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> {tr("farmAware", "Farm-aware guidance")}</div><h1>{copy.assistant}</h1><p>{tr("askWords", "Ask in your own words. Voice and managed AI connections can be added when configured.")}</p></div><StatusPill tone="amber">{listening ? tr("listening", "Listening") : tr("demoMode", "Demo response mode")}</StatusPill></div><div className="assistant-layout"><section className="panel chat-panel"><div className="chat-header"><div className="assistant-avatar"><Sprout size={20} /></div><div><strong>{tr("fieldAssistant", "Field assistant")}</strong><span><span className="online-dot" /> {tr("availableGuidance", "Available for guidance")}</span></div><button className="icon-button small"><MoreIcon /></button></div><div className="chat-messages">{messages.map((item, index) => <div className={`chat-row ${item.from}`} key={`${item.from}-${index}`}><div className="chat-bubble">{item.text}{item.from === "assistant" && <button className="bubble-speak" aria-label={tr("speakResponse", "Speak response")} onClick={() => speak(item.text)}><Volume2 size={14} /></button>}</div></div>)}</div><div className="suggestion-row"><button onClick={() => setMessage("What is the weather prediction for my location?")}>{tr("weatherPrediction", "Weather prediction")}</button><button onClick={() => setMessage("Can you predict early disease risk?")}>{tr("earlyDiseasePrediction", "Early disease prediction")}</button><button onClick={() => setMessage("Should I irrigate my tomato beds tonight?")}>{tr("irrigationTonight", "Irrigation tonight?")}</button><button onClick={() => setMessage("What can I grow with low water?")}>{tr("lowWaterCrops", "Low-water crops")}</button><button onClick={() => setMessage("How should I check a leaf spot?")}>{tr("leafSpots", "Leaf spots")}</button></div><div className="chat-input"><button className={`icon-button voice-button ${listening ? "is-listening" : ""}`} onClick={startVoiceInput} aria-label={tr("voiceInput", "Use voice input")}><Mic size={18} /></button><input value={message} onChange={event => setMessage(event.target.value)} onKeyDown={event => event.key === "Enter" && send()} placeholder={listening ? tr("listeningPrompt", "Listening… speak now") : copy.askAssistant} /><button className="send-button" onClick={() => send()}><ArrowRight size={17} /></button></div></section><aside className="assistant-side"><div className="panel context-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("contextUsed", "Context used")}</span><h3>{tr("farmSnapshot", "Your farm snapshot")}</h3></div><Settings2 size={17} /></div><div className="context-list"><span><Wheat size={16} /> 3 active crops</span><span><Droplets size={16} /> 61% soil moisture</span><span><MapPin size={16} /> Kolar, Karnataka</span><span><Globe2 size={16} /> {tr("languageResponse", "Selected-language response")}</span></div><button className="panel-link">{tr("manageContext", "Manage context")} <ArrowRight size={16} /></button></div><div className="panel safety-panel"><span className="safety-mark"><Check size={17} /></span><strong>{tr("guardrails", "Advice with guardrails")}</strong><p>{tr("cautiousAdvice", "Recommendations stay contextual and cautious. Always confirm disease or treatment decisions with an agronomist.")}</p></div></aside></div></div>;
}

function MoreIcon() { return <span className="more-icon">•••</span>; }

function Orders({ copy }: { copy: Copy }) {
  return <div className="page-stack"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> {tr("buyingTrail", "Your buying trail")}</div><h1>{copy.orders}</h1><p>{tr("keepDelivery", "Keep delivery details and sample checkout states in one place.")}</p></div><DataTag>{tr("testCheckout", "Test checkout")}</DataTag></div><div className="order-summary"><div><span>{tr("openOrders", "Open orders")}</span><strong>2</strong></div><div><span>{tr("inTransit", "In transit")}</span><strong>1</strong></div><div><span>{tr("deliveredMonth", "Delivered this month")}</span><strong>4</strong></div><div><span>{tr("communitySpend", "Community spend")}</span><strong>₹3,840</strong></div></div><section className="panel order-panel"><div className="panel-heading"><div><span className="panel-kicker">{tr("recentOrders", "Recent orders")}</span><h3>{tr("everythingView", "Everything in one view")}</h3></div><button className="secondary-button">{tr("downloadHistory", "Download history")}</button></div><div className="order-row"><span className="order-icon tomato">🍅</span><div><strong>{tr("freshTomatoes", "Fresh tomatoes · 4 kg")}</strong><span>{tr("orderLakshmi", "From Lakshmi Farms · Order #AS-1042")}</span></div><StatusPill>{tr("outForDelivery", "Out for delivery")}</StatusPill><strong>₹128</strong></div><div className="order-row"><span className="order-icon rice">🌾</span><div><strong>{tr("sonaRice", "Sona masuri rice · 5 kg")}</strong><span>{tr("orderRao", "From Rao Organics · Order #AS-1038")}</span></div><StatusPill tone="amber">{tr("processing", "Processing")}</StatusPill><strong>₹340</strong></div><div className="order-row"><span className="order-icon tools">💧</span><div><strong>{tr("dripKit", "Drip starter kit · 1 unit")}</strong><span>{tr("orderStore", "AgriSense sample store · Order #AS-1021")}</span></div><StatusPill>{tr("delivered", "Delivered")}</StatusPill><strong>₹2,450</strong></div></section></div>;
}

function Settings({ language, onLanguageChange, copy, onLogout }: { language: LanguageCode; onLanguageChange: (value: LanguageCode) => void; copy: Copy; onLogout: () => void }) {
  return <div className="page-stack"><div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-dot" /> {tr("personalWorkspace", "Personal workspace")}</div><h1>{copy.settings}</h1><p>{tr("keepLanguage", "Keep your language, data boundaries, and provider connections visible.")}</p></div></div><div className="settings-grid"><section className="panel settings-card"><div className="panel-heading"><div><span className="panel-kicker">{tr("preferences", "Preferences")}</span><h3>{tr("languageSpeaks", "How AgriSense speaks to you")}</h3></div><Globe2 size={18} /></div><label>{tr("appLanguage", "App language")}<LanguageSelect language={language} onChange={onLanguageChange} /></label><label>{tr("measurementUnits", "Measurement units")}<select defaultValue="metric"><option value="metric">{tr("metricUnits", "Metric · °C · kg/ha")}</option><option value="imperial">{tr("imperialUnits", "Imperial · °F · lb/acre")}</option></select></label><button className="primary-button">{copy.save} <Check size={16} /></button></section><section className="panel settings-card"><div className="panel-heading"><div><span className="panel-kicker">{tr("connections", "Connections")}</span><h3>{tr("liveToday", "What is live today?")}</h3></div><Zap size={18} /></div><div className="connection-row"><span className="connection-icon green"><MessageCircle size={16} /></span><div><strong>{tr("aiFarmingAssistant", "AI farming assistant")}</strong><small>{tr("localDemoResponse", "Local demo response · managed LLM ready")}</small></div><StatusPill tone="amber">{tr("demoStatus", "Demo")}</StatusPill></div><div className="connection-row"><span className="connection-icon blue"><CloudRain size={16} /></span><div><strong>{tr("weatherProvider", "Weather provider")}</strong><small>{tr("connectWeather", "Connect API for live forecasts")}</small></div><StatusPill tone="slate">{tr("offStatus", "Off")}</StatusPill></div><div className="connection-row"><span className="connection-icon amber"><UploadCloud size={16} /></span><div><strong>{tr("cropDiseaseModel", "Crop disease model")}</strong><small>{tr("modelUnavailableState", "Upload flow ready · model unavailable")}</small></div><StatusPill tone="slate">{tr("offStatus", "Off")}</StatusPill></div></section><section className="panel settings-card account-card"><div className="panel-heading"><div><span className="panel-kicker">{tr("accountAccess", "Account access")}</span><h3>{tr("phoneIdentity", "Phone-first identity")}</h3></div><UserRound size={18} /></div><div className="account-summary"><span className="avatar avatar-green large">A</span><div><strong>{tr("authenticatedPhone", "Authenticated with phone")}</strong><span>+91 98765 43210</span></div><StatusPill>{tr("verified", "Verified")}</StatusPill></div><button className="quiet-danger" onClick={onLogout}>{tr("signOut", "Sign out of this demo session")}</button></section></div></div>;
}

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>(() => (localStorage.getItem("agrisense-language") as LanguageCode) || "en");
  const [role, setRole] = useState<Role | null>(null);
  const [name, setName] = useState("");
  const [view, setView] = useState<View>("overview");
  const [cartCount, setCartCount] = useState(0);
  const copy = translations[language];
  activeLanguage = language;

  useEffect(() => { localStorage.setItem("agrisense-language", language); document.documentElement.lang = language; }, [language]);
  const content = useMemo(() => {
    if (!role) return null;
    if (view === "advisor") return <Advisor copy={copy} />;
    if (view === "health") return <FieldHealth language={language} />;
    if (view === "market") return <Marketplace copy={copy} role={role} onAdd={() => setCartCount(count => count + 1)} onClearCart={() => setCartCount(0)} cartCount={cartCount} />;
    if (view === "assistant") return <Assistant copy={copy} language={language} />;
    if (view === "orders") return <Orders copy={copy} />;
    if (view === "settings") return <Settings language={language} onLanguageChange={setLanguage} copy={copy} onLogout={() => { setRole(null); setName(""); setView("overview"); }} />;
    return role === "farmer" ? <FarmerOverview copy={copy} name={name} onView={setView} /> : <Marketplace copy={copy} role={role} onAdd={() => setCartCount(count => count + 1)} onClearCart={() => setCartCount(0)} cartCount={cartCount} />;
  }, [cartCount, copy, language, name, role, view]);

  if (!role) return <RoleChooser language={language} copy={copy} onLanguageChange={setLanguage} onChoose={setRole} />;
  if (!name) return <Login role={role} language={language} copy={copy} onLanguageChange={setLanguage} onBack={() => setRole(null)} onLogin={value => { setName(value); setView(role === "farmer" ? "overview" : "market"); }} />;
  return <Shell role={role} language={language} copy={copy} name={name} view={view} onView={setView} onLanguageChange={setLanguage} onLogout={() => { setRole(null); setName(""); }} cartCount={cartCount}>{content}</Shell>;
}
