class AimaraModel {
	/** * @param {Aimara} parent */
	constructor(parent) {
		/** * @type {Aimara} */
		this.parent = parent;

		/** * @type {[AimaraNode]} */
		this.nodeList = [];
	}

	/**
	 *
	 * @param {HTMLElement|null|undefined} parent
	 * @param {AimaraNode.defaults.options} options
	 * @return {AimaraNode}
	 */
	createNode(parent, options) {
		let node = new AimaraNode(this.parent, parent, options);
		this.nodeList.push(node);
		if (!parent) { this.parent.view.mainHolder.appendChild(this.nodeList[this.nodeList.length - 1].li); }
		else { this.nodeList[this.nodeList.length - 1].parent.appendChild(this.nodeList[this.nodeList.length - 1].li); }
		return this.nodeList[this.nodeList.length - 1];
	}

}