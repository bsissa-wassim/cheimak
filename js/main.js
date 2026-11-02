// ES modules are deferred by the browser. No bundler or runtime dependency.
import { initNavigation } from './navigation.js';
import { initLanguage } from './language.js';
import { initContact } from './contact.js';
import { initFounder } from './founder.js';
import './animations.js';

initLanguage();
initNavigation();
initContact();
initFounder();

// Only expose language controls once their handlers are attached.
document.documentElement.classList.replace('no-js', 'js');
