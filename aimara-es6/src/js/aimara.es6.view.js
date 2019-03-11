class AimaraView {
	/** * @param {Aimara} parent */
	constructor(parent) {
		/** * @type {Aimara} */
		this.parent = parent;

		this.mainHolder = document.createElement('UL');

		this.mainHolder.classList.add('tree');

		this.parent.container.appendChild(this.mainHolder);
	}
}