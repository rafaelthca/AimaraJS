class AimaraNodeController {
/** * @param {AimaraNode} parent */
	constructor(parent) {
		/** * @type {AimaraNode} */
		this.parent = parent;

		/** * @type {{onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}} */
		this.events = {
			onClickNode: {after: [], before: []},
			onClickExpandCollapse: {after: [], before: []},
			onClickNodeHolder: {after: [], before: []},
			onClickNodeHolderImage: {after: [], before: []},
			onClickNodeHolderAnchor: {after: [], before: []},
			onSelectNode: {after: [], before: []},
			onUnselectNode: {after: [], before: []},
			onSelectionChange: {after: [], before: []}
		};

		this.__events();
	}
	/**
	 *
	 * @private
	 */
	__events() {
		this.parent.view.li.addEventListener('click', event => this.onClickNode(event), false);
		this.parent.view.icon.addEventListener('click', event => this.onClickExpandCollapse(event), false);
		this.parent.view.label.span.addEventListener('click', event => this.onClickNodeHolder(event), false);
		this.parent.view.label.icon.addEventListener('click', event => this.onClickNodeHolderImage(event), false);
		this.parent.view.label.anchor.addEventListener('click', event => this.onClickNodeHolderAnchor(event), false);

		if (this.parent.options.contextMenu) {
			this.parent.view.li.addEventListener('contextmenu', event => this.showContextMenu(event), false);
			window.addEventListener('click', event => {
				if (this.parent.view.contextMenu.classList.contains('active')) { this.parent.view.contextMenu.classList.remove('active'); }
			}, false);
		}
	}
	showContextMenu(event) {
		console.log(event);
		event.preventDefault();
		event.stopPropagation();
		if (!this.parent.view.contextMenu.isConnected) { document.body.appendChild(this.parent.view.contextMenu); }
		if (!this.parent.view.contextMenu.classList.contains('active')) { this.parent.view.contextMenu.classList.add('active'); }
		this.parent.view.contextMenu.style.top = String((event.y - 12) || event.screenY || event.clientY) + 'px';
		this.parent.view.contextMenu.style.left = String(event.x || event.screenX || event.clientX) + 'px';
	}
	/**
	 *
	 * @param {Event} event
	 */
	onClickNode(event) {
		event.preventDefault();
		event.stopPropagation();
		this.events.onClickNode.before.map(callback => callback(event, this.parent));

		this.events.onClickNode.after.map(callback => callback(event, this.parent));
	}

	/**
	 *
	 * @param {Event} event
	 */
	onClickNodeHolder(event) {
		event.preventDefault();
		event.stopPropagation();
		this.events.onClickNodeHolder.before.map(callback => callback(event, this.parent));

		this.__selection();

		this.events.onClickNodeHolder.after.map(callback => callback(event, this.parent));
	}

	/**
	 *
	 * @param {Event} event
	 */
	onClickNodeHolderImage(event) {
		event.preventDefault();
		event.stopPropagation();

		this.events.onClickNodeHolderImage.before.map(callback => callback(event, this.parent));

		this.__selection();

		this.events.onClickNodeHolderImage.after.map(callback => callback(event, this.parent));
	}

	/**
	 *
	 * @param {Event} event
	 */
	onClickNodeHolderAnchor(event) {
		event.preventDefault();
		event.stopPropagation();

		this.events.onClickNodeHolderAnchor.before.map(callback => callback(event, this.parent));

		this.__selection();

		this.events.onClickNodeHolderAnchor.after.map(callback => callback(event, this.parent));
	}
	/**
	 *
	 * @param {Event|null} event
	 */
	expand(event) {
		this.parent.view.li.classList.add('on');
		if (this.parent.view.child) {
			this.parent.view.icon.classList.add(AimaraNode.defaults.iconCollapse);
			if (this.parent.view.icon.classList.contains(AimaraNode.defaults.iconExpand)) { this.parent.view.icon.classList.remove(AimaraNode.defaults.iconExpand); }
		}
	}
	/**
	 *
	 * @param {Event|null} event
	 */
	collapse(event) {
		this.parent.view.li.classList.remove('on');
		if (this.parent.view.child) {
			this.parent.view.icon.classList.add(AimaraNode.defaults.iconExpand);
			if (this.parent.view.icon.classList.contains(AimaraNode.defaults.iconCollapse)) { this.parent.view.icon.classList.remove(AimaraNode.defaults.iconCollapse); }
		}
	}
	/**
	 *
	 * @param {Event} event
	 */
	onClickExpandCollapse(event) {
		event.preventDefault();
		event.stopPropagation();
		this.events.onClickExpandCollapse.before.map(callback => callback(event, this.parent));

		if (this.parent.view.li.classList.contains('on')) { this.collapse(event); }
		else { this.expand(event); }

		this.events.onClickExpandCollapse.after.map(callback => callback(event, this.parent));
	}

	/**
	 *
	 * @private
	 */
	__selection() {
		if (this.parent.options.select) {
			if (this.parent.view.li.classList.contains('selected')) {
				this.events.onUnselectNode.before.map(callback => callback(event, this.parent));
				this.parent.view.li.classList.remove('selected');
				this.events.onUnselectNode.after.map(callback => callback(event, this.parent));
			} else {
				this.events.onSelectNode.before.map(callback => callback(event, this.parent));
				this.parent.view.li.classList.add('selected');
				this.events.onSelectNode.after.map(callback => callback(event, this.parent));
			}
		} else if (this.parent.aimaraParent.options.select && this.parent.options.select !== false) {
			if (this.parent.view.li.classList.contains('selected')) {
				this.events.onUnselectNode.before.map(callback => callback(event, this.parent));
				this.parent.view.li.classList.remove('selected');
				this.events.onUnselectNode.after.map(callback => callback(event, this.parent));
			} else {
				this.events.onSelectNode.before.map(callback => callback(event, this.parent));
				this.parent.view.li.classList.add('selected');
				this.events.onSelectNode.after.map(callback => callback(event, this.parent));
			}
		}
		if (!this.parent.aimaraParent.options.multiSelection) {
			if (this.parent.options.select ? this.parent.options.select === false : false) { return; }
			this.parent.aimaraParent.model.nodeList.map(node => {
				if (node.view.li.classList.contains('selected') && node.id !== this.parent.id) {
					this.events.onUnselectNode.before.map(callback => callback(event, this.parent));
					node.view.li.classList.remove('selected');
					this.events.onUnselectNode.after.map(callback => callback(event, this.parent));
				}
			});
		}
	}
}
