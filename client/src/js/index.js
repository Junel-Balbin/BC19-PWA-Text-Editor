// Imports modules and styles.
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// Get the main element from the DOM.
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner.
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Create a new instance of the Editor class.
const editor = new Editor();

// Check if the editor is defined.
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
