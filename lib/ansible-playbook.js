'use babel';

import AnsiblePlaybookView from './ansible-playbook-view';
import { CompositeDisposable } from 'atom';

export default {

  ansiblePlaybookView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ansiblePlaybookView = new AnsiblePlaybookView(state.ansiblePlaybookViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ansiblePlaybookView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ansible-playbook:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ansiblePlaybookView.destroy();
  },

  serialize() {
    return {
      ansiblePlaybookViewState: this.ansiblePlaybookView.serialize()
    };
  },

  toggle() {
    console.log('AnsiblePlaybook was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
