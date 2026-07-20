// Countries for the travel map on /journal/travel.
//
// `name` must match the country name in public/maps/countries-50m.json
// (Natural Earth names, e.g. 'United Kingdom', 'United States of America').
// `alpha2` is the two-letter ISO code, used only to render the flag emoji.
// Photos live in public/images/journal/travel/<folder>/.
//
// `years` and `note` are optional — fill them in per country over time.

export interface CountryVisit {
  name: string
  alpha2: string
  // Free text shown under the country name: '2019, 2022' or '2023–now'.
  years?: string
  // One line in Oriol's voice, shown in the popup.
  note?: string
  photos?: string[]
}

export const countries: CountryVisit[] = [
  {
    name: 'Spain',
    alpha2: 'ES',
    years: 'Born and raised',
    note: 'Home. Manresa, just outside Barcelona.',
  },
  {
    name: 'United Kingdom',
    alpha2: 'GB',
    years: '2023–now',
    note: 'Moved over in 2023 for university and basketball. Now London is home.',
  },
  { name: 'France', alpha2: 'FR' },
  { name: 'Andorra', alpha2: 'AD' },
  { name: 'Italy', alpha2: 'IT' },
  { name: 'Vatican', alpha2: 'VA' },
  { name: 'Germany', alpha2: 'DE' },
  { name: 'Belgium', alpha2: 'BE' },
  { name: 'Netherlands', alpha2: 'NL' },
  { name: 'Czechia', alpha2: 'CZ' },
  { name: 'Bulgaria', alpha2: 'BG' },
  { name: 'Malta', alpha2: 'MT' },
  { name: 'Morocco', alpha2: 'MA' },
  { name: 'United States of America', alpha2: 'US' },
]
