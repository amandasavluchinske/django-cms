import Modal from '../cms.modal';
import $ from 'jquery';

import keyboard from '../keyboard';
import tmpl from '../tmpl';
var template = require('./help.html');

console.log('keyboard object:', keyboard);
console.log('keyboard methods:', Object.keys(keyboard));

/**
 * Binds [?] to open modal with shorcuts listing.
 *
 * @function initHelpShortcut
 * @public
 */
export default function initHelpShortcut() {
    var shortcutAreas = CMS.config.lang.shortcutAreas;
    var modal = new Modal({
        width: 600,
        height: 600,
        resizable: false,
        minimizable: false,
        maximizable: false
    });

    /**
     * openModal
     *
     * @private
     * @param {Event} e
     */
    function openModal() {
        modal.open({
            title: CMS.config.lang.shortcuts,
            html: tmpl(template, { shortcutAreas: shortcutAreas })
        });
    }

    // Handle both the keyboard library and DOM events
    document.addEventListener('keydown', function(e) {
        // Check if the active element is an input, textarea, or has contenteditable
        var isInputField = (
            document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA' ||
            document.activeElement.contentEditable === 'true'
        );

        if (!isInputField && (e.key === '?' || (e.shiftKey && e.key === '/'))) {
            e.preventDefault();
            openModal();
        }
    });

    keyboard.bind('?', function(e) {
        var isInputField = (
            document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA' ||
            document.activeElement.contentEditable === 'true'
        );

        if (!isInputField) {
            e.preventDefault();
            openModal();
        }
    });

    keyboard.bind('shift+/', function(e) {
        var isInputField = (
            document.activeElement.tagName === 'INPUT' ||
            document.activeElement.tagName === 'TEXTAREA' ||
            document.activeElement.contentEditable === 'true'
        );

        if (!isInputField) {
            e.preventDefault();
            openModal();
        }
    });

    $(document).on('pointerup.cms', '.cms-show-shortcuts', openModal);
}

