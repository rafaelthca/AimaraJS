class AimaraNodeView {
/** * @param {AimaraNode} parent */
	constructor(parent) {
		/** * @type {AimaraNode} */
		this.parent = parent;

		/** * @type {HTMLElement|null|undefined} */
		this.li = document.createElement('LI');          /// Parent LI
		this.li.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8); return v.toString(16); }).toUpperCase();
		/** * @type {HTMLElement|null|undefined} */
		this.icon = document.createElement('I');         /// Expand/Collapse image
		/** * @type {HTMLElement|null|undefined} */
		this.child = null;                                       /// Child UL tree
		/** * @type {{anchor: HTMLElement|null|undefined, icon: HTMLElement|null|undefined, span: HTMLElement|null|undefined}} */
		this.label = {
			span: document.createElement('SPAN'),        /// Span holder for node icon and label
			icon: document.createElement('I'),           /// Node icon
			anchor: document.createElement('A')          /// Node Label
		};
		this.contextMenu = document.createElement('UL');
		this.contextMenu.classList.add('context-menu');
		this.buildContextMenu(this.parent.options.contextMenu, null);
		this.__prettify();
		this.__assembly();
		this.__builder();
	}

	/**
	 *
	 * @param {AimaraNode.defaults.options.contextMenu} context
	 * @param parent
	 * @returns {null}
	 */
	buildContextMenu(context, parent) {
		if (!context) { return null; }
		let menus = Object.keys(context);

		menus.map(item => {
			let li = document.createElement('LI');
			let span = document.createElement('SPAN');
			let icon = document.createElement('I');
			icon.classList.add('fa');
			if (context[item].icon) { icon.classList.add(context[item].icon); }
			let anchor = document.createElement('A');
			anchor.innerHTML = context[item].label;
			li.appendChild(span);
			span.appendChild(icon);
			span.appendChild(anchor);
			li.addEventListener('click', event => {
				event.stopPropagation();
				event.preventDefault();
				if (context[item].action) {
					context[item].action(event, li, parent || this.contextMenu, this.parent);

					if (parent) { if (parent.classList.contains('active')) { parent.classList.remove('active'); } }
					else { if (this.contextMenu.classList.contains('active')) { this.contextMenu.classList.remove('active'); } }
				}
			}, false);
			if (parent) { parent.appendChild(li); }
			else { this.contextMenu.appendChild(li); }

			if (context[item].submenus) {
				let nParent = document.createElement('UL');
				let chev = document.createElement('I');
				chev.classList.add('fa');
				chev.classList.add('chevron');
				chev.classList.add('fa-chevron-right');
				span.appendChild(chev);
				li.appendChild(nParent);
				this.buildContextMenu(context[item].submenus, nParent);
			}
		});

	}
	__prettify() {
		this.icon.classList.add('fa');
		this.icon.classList.add(AimaraNode.defaults.iconNoChild);
		this.label.icon.classList.add('fa');

		if (this.parent.options.hover || this.parent.options.select || (this.parent.aimaraParent.options.select && this.parent.options.select !== false)) { this.li.classList.add('hover'); }
		else if (this.parent.aimaraParent.options.hover && this.parent.options.hover !== false) { this.li.classList.add('hover'); }
	}

	__assembly() {
		this.li.appendChild(this.icon);
		this.li.appendChild(this.label.span);

		this.label.span.appendChild(this.label.icon);
		this.label.span.appendChild(this.label.anchor);
	}
	__builder() {
		if (this.parent.options.icon) { this.label.icon.classList.add(this.parent.options.icon); }
		if (this.parent.options.label) { this.label.anchor.innerHTML = this.parent.options.label; }
	}
}