class AimaraNodeModel {
	/** * @param {AimaraNode} parent */
	constructor(parent) {
		/** * @type {AimaraNode} */
		this.parent = parent;
		this.contextMenu = this.parent.options.contextMenu || null;
	}

}