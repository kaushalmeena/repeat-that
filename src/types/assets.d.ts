/**
 * Metro resolves an asset import to an opaque numeric handle. Expo ships no
 * declaration for audio, so the tile tones need one to type check.
 */
declare module "*.wav" {
  const asset: number;
  export default asset;
}
