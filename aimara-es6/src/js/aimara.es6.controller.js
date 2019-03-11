class AimaraController {
	/** * @param {Aimara} parent */
	constructor(parent) {
		/** * @type {Aimara} */
		this.parent = parent;
	}


	/**
	 *
	 * @param {Event} event
	 * @param {{parent: *, img: HTMLElement, label: {img: HTMLElement, anchor: HTMLElement, span: HTMLElement}, li: HTMLElement, events: {onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}, child: null}} node
	 */
	onClickNode(event, node) {
		event.preventDefault();
		event.stopPropagation();
		node.events.onClickNode.before.map(callback => callback(event, node));

		node.events.onClickNode.after.map(callback => callback(event, node));
	}

	/**
	 *
	 * @param {Event} event
	 * @param {{parent: *, img: HTMLElement, label: {img: HTMLElement, anchor: HTMLElement, span: HTMLElement}, li: HTMLElement, events: {onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}, child: null}} node
	 */
	onClickNodeHolder(event, node) {
		event.preventDefault();
		event.stopPropagation();

		node.events.onClickNodeHolder.before.map(callback => callback(event, node));

		node.events.onClickNodeHolder.after.map(callback => callback(event, node));
	}

	/**
	 *
	 * @param {Event} event
	 * @param {{parent: *, img: HTMLElement, label: {img: HTMLElement, anchor: HTMLElement, span: HTMLElement}, li: HTMLElement, events: {onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}, child: null}} node
	 */
	onClickNodeHolderImage(event, node) {
		event.preventDefault();
		event.stopPropagation();

		node.events.onClickNodeHolderImage.before.map(callback => callback(event, node));

		node.events.onClickNodeHolderImage.after.map(callback => callback(event, node));
	}

	/**
	 *
	 * @param {Event} event
	 * @param {{parent: *, img: HTMLElement, label: {img: HTMLElement, anchor: HTMLElement, span: HTMLElement}, li: HTMLElement, events: {onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}, child: null}} node
	 */
	onClickNodeHolderAnchor(event, node) {
		event.preventDefault();
		event.stopPropagation();

		node.events.onClickNodeHolderAnchor.before.map(callback => callback(event, node));

		node.events.onClickNodeHolderAnchor.after.map(callback => callback(event, node));
	}

	/**
	 *
	 * @param {Event} event
	 * @param {{parent: *, img: HTMLElement, label: {img: HTMLElement, anchor: HTMLElement, span: HTMLElement}, li: HTMLElement, events: {onClickExpandCollapse: {before: Array, after: Array}, onClickNodeHolderImage: {before: Array, after: Array}, onClickNodeHolder: {before: Array, after: Array}, onClickNodeHolderAnchor: {before: Array, after: Array}, onClickNode: {before: Array, after: Array}}, child: null}} node
	 */
	onClickExpandCollapse(event, node) {
		event.preventDefault();
		event.stopPropagation();
		node.events.onClickExpandCollapse.before.map(callback => callback(event, node));

		if (node.li.classList.contains('on')) {
			node.li.classList.remove('on');
			if (node.child) { node.img.src = 'static/vendors/aimara/images/expand.png'; }
		} else {
			node.li.classList.add('on');
			if (node.child) { node.img.src = 'static/vendors/aimara/images/collapse.png'; }
		}

		node.events.onClickExpandCollapse.after.map(callback => callback(event, node));
	}
}

class AimaraException extends DOMException {
	constructor(message) {
		super();
		console.log(message);
	}
}