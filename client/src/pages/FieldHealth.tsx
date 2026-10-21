import {
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  CloudRain,
  CloudSun,
  Droplets,
  LocateFixed,
  MapPin,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sprout,
  Sun,
  Thermometer,
  UploadCloud,
  Wind,
} from "lucide-react";
import { useMemo, useState } from "react";
import { translate, type AppLanguage } from "@/lib/i18n";

type Props = { language: AppLanguage };
const t = (language: AppLanguage, key: string, fallback: string) => translate(language, key, fallback);

const forecast = [
  { day: "Today", icon: Sun, temp: "28°", rain: "12%", note: "Warm & bright" },
  { day: "Thu", icon: CloudSun, temp: "27°", rain: "34%", note: "Clouds build" },
  { day: "Fri", icon: CloudRain, temp: "25°", rain: "72%", note: "Rain likely" },
  { day: "Sat", icon: CloudRain, temp: "24°", rain: "64%", note: "Wet morning" },
  { day: "Sun", icon: Sun, temp: "27°", rain: "18%", note: "Clearing" },
];

export default function FieldHealth({ language }: Props) {
  const [location, setLocation] = useState("Kolar, Karnataka");
  const [locationSource, setLocationSource] = useState<"manual" | "browser">("manual");
  const [symptoms, setSymptoms] = useState<string[]>(["spots"]);
  const [scanState, setScanState] = useState<"idle" | "ready" | "reviewed">("idle");
  const [showPlan, setShowPlan] = useState(false);
  const [message, setMessage] = useState("");
  const [conditionCycle, setConditionCycle] = useState(0);

  const risk = useMemo(() => symptoms.length >= 2 ? "high" : symptoms.length === 1 ? "moderate" : "low", [symptoms]);
  const weatherProfile = useMemo(() => {
    const key = location.toLowerCase();
    if (/kerala|goa|mumbai|chennai|kochi|coastal/.test(key)) return { shift: -1, rainShift: 18, humidity: "78%", wind: "16 km/h", note: t(language, "coastalPattern", "Coastal rain pattern"), condition: t(language, "coastalCondition", "Humid with showers"), irrigation: t(language, "holdIrrigationWindow", "Hold irrigation until the next dry window") };
    if (/delhi|punjab|rajasthan|haryana|north/.test(key)) return { shift: 3, rainShift: -18, humidity: "42%", wind: "9 km/h", note: t(language, "dryPattern", "Dry inland pattern"), condition: t(language, "dryCondition", "Hot and dry"), irrigation: t(language, "morningIrrigationWindow", "Prefer a short morning irrigation window") };
    if (/hyderabad|telangana|bengaluru|kolar|karnataka/.test(key)) return { shift: 0, rainShift: 4, humidity: "64%", wind: "11 km/h", note: t(language, "localPattern", "Local seasonal pattern"), condition: t(language, "localCondition", "Clear and warm"), irrigation: t(language, "irrigationWindow", "Good irrigation window after 6 PM") };
    return { shift: 1, rainShift: 0, humidity: "58%", wind: "12 km/h", note: t(language, "regionalPattern", "Regional seasonal pattern"), condition: t(language, "localCondition", "Partly clear"), irrigation: t(language, "irrigationWindow", "Check soil moisture before watering") };
  }, [language, location]);
  const localForecast = useMemo(() => forecast.map((item, index) => ({ ...item, temp: `${Number(item.temp.replace("°", "")) + weatherProfile.shift + (conditionCycle % 2 === 1 && index > 1 ? 1 : 0)}°`, rain: `${Math.max(4, Math.min(96, Number(item.rain.replace("%", "")) + weatherProfile.rainShift + (conditionCycle % 2 === 1 ? 8 : 0)))}%` })), [conditionCycle, weatherProfile.rainShift, weatherProfile.shift]);
  const toggleSymptom = (value: string) => setSymptoms(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value]);
  const useLocation = () => {
    if (!navigator.geolocation) {
      setMessage(t(language, "locationUnavailable", "Browser location is unavailable. Choose a location manually."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => { setLocation(t(language, "currentLocation", "Current browser location")); setLocationSource("browser"); setMessage(""); },
      () => setMessage(t(language, "locationDenied", "Location permission was not granted. You can still choose a location manually.")),
      { enableHighAccuracy: false, timeout: 8000 },
    );
  };
  const onLeafUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) setScanState("ready");
  };

  return (
    <div className="page-stack field-health-page">
      <div className="page-heading health-heading">
        <div><div className="eyebrow"><span className="eyebrow-dot" /> {t(language, "fieldHealth", "Field health")}</div><h1>{t(language, "weatherDisease", "Weather & crop health")}</h1><p>{t(language, "healthSubtitle", "Know what the sky is doing, spot risk early, and act before a small problem spreads.")}</p></div>
        <div className="health-status"><span className="pulse-dot" /> {t(language, "earlySignals", "Early signals active")}</div>
      </div>

      <section className="location-bar panel">
        <div className="location-title"><span className="location-icon"><MapPin size={18} /></span><div><span>{t(language, "weatherFor", "Weather for")}</span><strong>{location}</strong></div></div>
        <div className="location-actions"><div className="location-input"><MapPin size={15} /><input value={locationSource === "browser" ? location : location} onChange={event => { setLocation(event.target.value); setLocationSource("manual"); }} aria-label={t(language, "location", "Location")} /></div><button className="secondary-button" onClick={useLocation}><LocateFixed size={15} /> {t(language, "useMyLocation", "Use my location")}</button><span className="provider-chip"><span /> {t(language, "demoForecast", "Demo forecast")}</span></div>
      </section>
      {message && <div className="inline-notice"><AlertTriangle size={15} /> {message}</div>}

      <div className="health-grid">
        <section className="panel weather-panel">
          <div className="panel-heading"><div><span className="panel-kicker">{t(language, "weatherIntelligence", "Weather intelligence")}</span><h3>{t(language, "fiveDayForecast", "5-day field forecast")}</h3></div><div className="health-panel-actions"><button className="icon-button small" onClick={() => setConditionCycle(cycle => cycle + 1)} aria-label={t(language, "refreshConditions", "Refresh conditions")}><RefreshCw size={15} /></button><span className="data-tag live"><span /> {t(language, "locationBased", "Location-based")}</span></div></div>
          <div className="current-weather"><div className="current-weather-icon"><Sun size={32} /></div><div><strong>{localForecast[0].temp}</strong><span>{weatherProfile.condition}</span><small>{weatherProfile.note} · {weatherProfile.irrigation}</small></div><div className="weather-metrics"><span><Droplets size={14} /> 61% soil</span><span><Wind size={14} /> {weatherProfile.wind}</span><span><Thermometer size={14} /> {weatherProfile.humidity} humidity</span></div></div>
          <div className="forecast-strip">{localForecast.map(item => { const Icon = item.icon; return <div className="forecast-day" key={item.day}><span>{item.day === "Today" ? t(language, "today", "Today") : item.day}</span><Icon size={21} /><strong>{item.temp}</strong><small><Droplets size={11} /> {item.rain}</small><em>{item.note}</em></div>; })}</div>
          <div className="weather-recommendation"><span className="recommendation-mark"><Check size={16} /></span><div><strong>{t(language, "rainPlan", "Rain plan for your tomato beds")}</strong><p>{t(language, "rainPlanDetail", "Rain is likely Friday. Hold one irrigation cycle and check drainage before the wet morning.")}</p></div></div>
          <div className="provider-disclaimer"><CloudRain size={14} /> {t(language, "weatherDisclaimer", "Forecast is a demonstration until a weather provider is connected. Live results will use the selected location and freshness timestamp.")}</div>
        </section>

        <section className="panel disease-panel">
          <div className="panel-heading"><div><span className="panel-kicker">{t(language, "cropHealth", "Crop health")}</span><h3>{t(language, "earlyDisease", "Early disease warning")}</h3></div><span className="scan-badge"><ScanLine size={14} /> {t(language, "screening", "Screening")}</span></div>
          <div className="disease-intro"><div className="health-orb"><Sprout size={24} /></div><div><strong>{t(language, "catchEarly", "Catch stress before it spreads")}</strong><p>{t(language, "uploadLeafHint", "Upload a clear leaf photo or mark what you see. The result stays an early warning until a model and expert review are connected.")}</p></div></div>
          <label className={`upload-zone ${scanState !== "idle" ? "has-file" : ""}`}><input type="file" accept="image/png,image/jpeg,image/webp" onChange={onLeafUpload} /><span className="upload-icon">{scanState === "idle" ? <Camera size={22} /> : <CheckCircle2 size={22} />}</span><strong>{scanState === "idle" ? t(language, "uploadLeaf", "Upload leaf image") : t(language, "imageReady", "Leaf image ready for review")}</strong><small>{t(language, "uploadFormats", "JPG, PNG or WebP · max 10 MB")}</small></label>
          <div className="symptom-heading"><span>{t(language, "visibleSigns", "Visible signs")}</span><small>{t(language, "chooseAll", "Choose all that apply")}</small></div>
          <div className="symptom-grid">{[["spots", t(language, "leafSpotsSign", "Leaf spots")], ["curl", t(language, "curling", "Curling leaves")], ["yellow", t(language, "yellowing", "Yellowing")], ["mildew", t(language, "mildew", "White coating")]].map(([value, label]) => <button className={`symptom-chip ${symptoms.includes(value) ? "selected" : ""}`} key={value} onClick={() => toggleSymptom(value)}><span>{symptoms.includes(value) && <Check size={12} />}</span>{label}</button>)}</div>
          <button className="primary-button full-width" onClick={() => setScanState("reviewed")}><ScanLine size={16} /> {t(language, "runEarlyCheck", "Run early check")}</button>
          {scanState === "reviewed" && <div className={`risk-result ${risk}`}><span className="risk-icon">{risk === "high" ? <AlertTriangle size={18} /> : <ShieldCheck size={18} />}</span><div><strong>{t(language, "prediction", "Prediction")} · {risk === "high" ? t(language, "higherRisk", "Higher early-warning risk") : risk === "moderate" ? t(language, "moderateRisk", "Moderate early-warning risk") : t(language, "lowRisk", "Low early-warning risk")}</strong><p>{t(language, "riskDisclaimer", "This is a screening signal, not a confirmed diagnosis. Isolate the affected area and request expert confirmation before treatment.")}</p></div></div>}
        </section>
      </div>

      <section className="panel eradication-panel"><div className="eradication-heading"><div><span className="panel-kicker">{t(language, "safeAction", "Safe action plan")}</span><h3>{t(language, "eradication", "Containment & eradication steps")}</h3><p>{t(language, "eradicationSubtitle", "Practical steps to reduce spread while you wait for a verified diagnosis.")}</p></div><div className="plan-actions"><span className={`plan-risk ${scanState === "reviewed" ? risk : "pending"}`}>{scanState === "reviewed" ? `${t(language, "prediction", "Prediction")}: ${risk === "high" ? t(language, "higherRisk", "Higher early-warning risk") : risk === "moderate" ? t(language, "moderateRisk", "Moderate early-warning risk") : t(language, "lowRisk", "Low early-warning risk")}` : t(language, "screeningPending", "Screening pending")}</span><button className="secondary-button" onClick={() => setShowPlan(current => !current)}>{showPlan ? t(language, "hidePlan", "Hide plan") : t(language, "openPlan", "Open eradication plan")} <ScanLine size={15} /></button></div></div>{showPlan && <div className="eradication-steps"><div><span>01</span><strong>{t(language, "isolate", "Isolate the affected plants")}</strong><p>{t(language, "isolateDetail", "Avoid moving tools or hands from the affected patch to healthy plants.")}</p></div><div><span>02</span><strong>{t(language, "remove", "Remove visibly affected material")}</strong><p>{t(language, "removeDetail", "Bag and dispose of heavily affected leaves away from the growing area; do not compost uncertain disease material.")}</p></div><div><span>03</span><strong>{t(language, "airflow", "Improve airflow and drainage")}</strong><p>{t(language, "airflowDetail", "Space foliage, avoid wetting leaves late in the day, and check standing water after rain.")}</p></div><div><span>04</span><strong>{t(language, "confirm", "Confirm before treatment")}</strong><p>{t(language, "confirmDetail", "Share the image with an agronomist or extension officer before using any crop-protection product.")}</p></div></div>}</section>
    </div>
  );
}
