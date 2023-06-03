const profiles = [
  "/images/profile_default_1.svg",
  "/images/profile_default_2.svg",
  "/images/profile_default_3.svg",
  "/images/profile_default_4.svg",
  "/images/profile_default_5.svg",
  "/images/profile_default_6.svg",
];

export function profileShuffle() {
  return profiles[Math.floor(Math.random() * 6)];
}
