const butInstall = document.getElementById('buttonInstall');
const textHeader = document.getElementById('textHeader');

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('is it working?')
    window.deferredPrompt = event;
    butInstall.style.visibility = 'visible';
    
    // Click event handler on the `butInstall` element
    butInstall.addEventListener('click', () => {
        console.log('install button')
        event.prompt();
        butInstall.setAttribute('disabled', true);
        butInstall.textContent = 'Installed!';

        butInstall.classList.toggle('hidden', true);
    });
});

// Handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('line 24')
    window.deferredPrompt = null;
    textHeader.textContent = 'Just Another Text Editor: Installed';
    console.log('appinstalled', event);
});
