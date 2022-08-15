import './Modal.scss';

export default function Modal({active, setActive, children}) {

	return (
		<div className={`modal ${active ? 'active' : ''}`} onClick={() => setActive(false)}>
			<div className={`modal__content ${active ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}