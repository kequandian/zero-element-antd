import ReactDOM from 'react-dom';

export default function canPortal(ref, reactEl) {
  if (ref && ref.current) {
    return ReactDOM.createPortal(
      reactEl,
      ref.current);
  }
  return reactEl;
}