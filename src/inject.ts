/**
 * https://github.com/artem-solovev/gloc
 *
 * Licensed GPL-2.0 © Artem Solovev
 */
import 'pjax';

import { log } from './utils/log';
import { renderLocs } from './utils/renderLocs';
import { getLinksFromDom } from './utils/getLinksFromDom';

/**
 * Accepted abbreviations
 * - LOC - lines of code
 */

let githubToken: string = '';
let glocMode: boolean = false;

/**
 * Main
 */
(() => {
	chrome.storage.sync.get(['x-github-token', 'glocMode'], result => {
		console.log('chrome.storage.sync.get', result);
		if (result && result['x-github-token'] !== null) {
			githubToken = result['x-github-token'];
		}

		if (result['glocMode']) {
			gloc();
	
			document.addEventListener('pjax:complete', () => {
				gloc();
			})
		}
	});
})();

const gloc = (): void => {
	getLinksFromDom()
		.then(links => {
			renderLocs(links, githubToken);

			log('info', links);
		})
		.catch(err => log('err', err));
};
