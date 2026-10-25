// Shared by the layout (server) and the night mode switch (client).
export const NIGHT_KEY = 'omorros-night'

// Runs in <head> before paint so a reload at night never flashes white.
export const nightScript = `try{if(sessionStorage.getItem('${NIGHT_KEY}')==='1')document.documentElement.classList.add('night')}catch(e){}`
