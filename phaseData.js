export const phaseData = [
  {
    day: 1,
    phase: "Withdrawal",
    sideEffects: "Mild restlessness, strong cravings, irritability, anxiety, low focus",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Mild restlessness, strong cravings, irritability, anxiety, low focus. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 2,
    phase: "Withdrawal",
    sideEffects: "Cravings peak, occasional dizziness, difficulty concentrating, irritability",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Cravings peak, occasional dizziness, difficulty concentrating, irritability. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 3,
    phase: "Withdrawal",
    sideEffects: "Irritability, light insomnia, scattered thoughts, cravings begin to decrease",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Irritability, light insomnia, scattered thoughts. Cravings decreasing. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 4,
    phase: "Mental Fog",
    sideEffects: "Low motivation, boredom, mild frustration, craving episodes",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Low motivation, boredom, mild frustration, craving episodes. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 5,
    phase: "Mental Fog",
    sideEffects: "Lethargy, mental sluggishness, mild anxiety, continued cravings",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Lethargy, mental sluggishness, mild anxiety. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 6,
    phase: "Mental Fog",
    sideEffects: "Mood swings, impatience, brain fog, cravings mostly mental",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Mood swings, impatience, brain fog. Cravings mostly mental. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 7,
    phase: "Mental Fog",
    sideEffects: "Low motivation, reduced pleasure from usual activities, minor cravings",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Low motivation, reduced pleasure from activities, minor cravings. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 8,
    phase: "Clarity",
    sideEffects: "Mild cravings, improved energy, clearer thinking, focus increases",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Mild cravings, improved energy, clearer thinking, focus increases. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 9,
    phase: "Clarity",
    sideEffects: "Alertness improves, low stress, mental clarity returns, cravings minimal",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Alertness improves, low stress, mental clarity returns. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 10,
    phase: "Clarity",
    sideEffects: "Cravings almost gone, stable mood, strong focus",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Cravings almost gone, stable mood, strong focus. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 11,
    phase: "Identity Rebuild",
    sideEffects: "Confidence returns, minimal desire for cigarettes, sense of control increases",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Confidence returns, minimal desire for cigarettes, control increases. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 12,
    phase: "Identity Rebuild",
    sideEffects: "Calm, motivated, stable moods, mental clarity",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Calm, motivated, stable moods, mental clarity. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 13,
    phase: "Identity Rebuild",
    sideEffects: "Energy steady, focus strong, almost no cravings",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Energy steady, focus strong, almost no cravings. ${getHourlyMessage(i)}`
    )
  },
  {
    day: 14,
    phase: "Identity Rebuild",
    sideEffects: "Fully stabilized, natural motivation, clear mind, complete non-smoker identity",
    hours: Array(24).fill(null).map((_, i) => 
      `Hour ${i}–${i + 1}: Fully stabilized, natural motivation, clear mind. ${getHourlyMessage(i)}`
    )
  }
];

function getHourlyMessage(hour) {
  if (hour >= 6 && hour < 9) {
    return "Energy may be low; hydrate, breathe. I don't smoke — that chapter is closed.";
  } else if (hour >= 12 && hour < 15) {
    return "Cravings may peak; observe urges. I am a non-smoker.";
  } else if (hour >= 15 && hour < 18) {
    return "Mood swings or restlessness are temporary. I don't smoke.";
  } else if (hour >= 18 && hour < 21) {
    return "Relax and wind down; dopamine is recalibrating. I am a non-smoker.";
  } else if (hour >= 21 || hour < 6) {
    return "Avoid triggers before sleep; observe your mind. I don't smoke.";
  }
  return "Stay present, breathe deeply. I am a non-smoker.";
}
