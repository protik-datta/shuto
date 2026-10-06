import { Link } from 'react-router-dom';
import { SITE } from '../../constants/site';

export default function Logo({ className = '' }) {
  return (
    <Link to="/" aria-label={`${SITE.name} home`} className={`text-xl font-bold uppercase tracking-[0.22em] ${className}`}>
      {SITE.name}
    </Link>
  );
}
