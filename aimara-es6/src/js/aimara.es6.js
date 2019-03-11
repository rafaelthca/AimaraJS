class Aimara {
	/**
	 *
	 * @param {string|HTMLElement} container
	 * @param {Aimara.defaults.options|null|undefined} options
	 */
	constructor(container, options) {
		options = options || JSON.parse(JSON.stringify(Aimara.defaults.options));
		/** * @type {Aimara.defaults.options|{}} */
		this.options = options;

		/** * @type {HTMLElement|null} */
		this.container = null;

		if (typeof(container) === "string") { this.container = document.getElementById(container); }
		else if (container instanceof HTMLElement) { this.container = container; }
		else { throw new AimaraException("Invalid Parent container.\n\nThe Parent container could be type of string or HTMLElement"); }

		if (!this.container) { throw new AimaraException("Invalid Parent container.\n\nThe Parent container could be type of string or HTMLElement"); }

		/** * @type {AimaraModel} */
		this.model = new AimaraModel(this);
		/** * @type {AimaraView} */
		this.view = new AimaraView(this);
		/** * @type {AimaraController} */
		this.controller = new AimaraController(this);
	}

	/**
	 *
	 * @param {AimaraNode.defaults.options} options
	 * @return {AimaraNode}
	 */
	createNode(options) {
		return this.model.createNode(null, options);
	}

	/**
	 *
	 * @param {HTMLElement|null|undefined} parent
	 * @param {AimaraNode.defaults.options} options
	 * @return {AimaraNode}
	 */
	createChildNode(parent, options) {
		return this.model.createNode(parent, options);
	}

	clear() {
		this.model.nodeList.map(node => node.remove());
		this.model.nodeList = [];
	}
	expandAll() { this.model.nodeList.map(node => node.controller.expand(null)); }
	collapseAll() { this.model.nodeList.map(node => node.controller.collapse(null)); }
}

/**
 *
 * @type {{options: {hover: boolean|null|undefined, select: boolean|null|undefined, multiSelection: boolean|null|undefined}}}
 */
Aimara.defaults = {
	options: {
		multiSelection: true,
		select: true,
		hover: true
	}
};