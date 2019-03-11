class AimaraNode {
	/**
	 *
	 * @param {Aimara} aimara
	 * @param {HTMLElement|null|undefined} parent
	 * @param {AimaraNode.defaults.options} options
	 */
	constructor(aimara, parent, options) {
		options = options || JSON.parse(JSON.stringify(AimaraNode.defaults.options));
		/** * @type {AimaraNode.defaults.options} */
		this.options = options;

		/** * @type {HTMLElement|null|undefined} */
		this.parent = parent || null;
		/** * @type {Aimara} */
		this.aimaraParent = aimara;
		/** * @type {AimaraNodeModel} */
		this.model = new AimaraNodeModel(this);
		/** * @type {AimaraNodeView} */
		this.view = new AimaraNodeView(this);
		/** * @type {AimaraNodeController} */
		this.controller = new AimaraNodeController(this);
	}

	get li() { return this.view.li; }
	set id(v) { this.view.li.id = v; }
	get id() { return this.view.li.id; }

	addEventListener (event, callback, after=true) {
		switch (event) {
			case 'click_node': this.controller.events.onClickNode[after ? 'after' : 'before'].push(callback); break;
			case 'click_expand_collapse': this.controller.events.onClickExpandCollapse[after ? 'after' : 'before'].push(callback); break;
			case 'click_node_holder': this.controller.events.onClickNodeHolder[after ? 'after' : 'before'].push(callback); break;
			case 'click_node_holder_image': this.controller.events.onClickNodeHolderImage[after ? 'after' : 'before'].push(callback); break;
			case 'click_node_holder_anchor': this.controller.events.onClickNodeHolderAnchor[after ? 'after' : 'before'].push(callback); break;
			default: throw new AimaraException('Invalid event type.');
		}
	};
	appendChild(element) {
		if (this.view.child) { this.view.child.appendChild(element); }
		else {
			this.view.child = document.createElement('UL');
			if (this.view.icon.classList.contains(AimaraNode.defaults.iconNoChild)) { this.view.icon.classList.remove(AimaraNode.defaults.iconNoChild); }
			this.view.icon.classList.add(AimaraNode.defaults.iconExpand);
			this.view.li.appendChild(this.view.child);
			this.view.child.appendChild(element);
		}
	}
	createNode(options) {
		return this.aimaraParent.createChildNode(this, options);
	}
	remove() {
		if (!this.view.li.isConnected) { return; }

		if (this.parent) { this.parent.view.child.removeChild(this.view.li); }
		else { this.aimaraParent.view.mainHolder.removeChild(this.view.li); }
	}
	insert() {
		if (this.view.li.isConnected) { return; }

		if (this.parent) { this.parent.view.child.appendChild(this.view.li); }
		else { this.aimaraParent.view.mainHolder.appendChild(this.view.li); }
	}
}

/**
 *
 * @type {{iconNoChild: string, iconExpand: string, options: {hover: boolean, select: boolean, contextMenu: {itemName: {icon: string, action: AimaraNode.defaults.options.contextMenu.itemName.action, label: string, submenus: {}}}, icon: string, label: string}, iconCollapse: string}}
 */
AimaraNode.defaults = {
	iconNoChild: 'fa-dot-circle',
	iconExpand: 'fa-plus-square',
	iconCollapse: 'fa-minus-square',
	options: {
		icon: '',
		label: '',
		hover: false,
		select: false,
		contextMenu: {
			itemName: {
				icon: '',
				label: '',
				action: ()=>{},
				submenus: {}
			}
		}
	}
};