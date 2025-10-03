import React from 'react';
import Badge from '../../atoms/Badge';
import { Advocate } from '../../../types/advocate';
import styles from './style.module.css';

export interface AdvocateCardProps {
  advocate: Advocate;
  className?: string;
  onClick?: (advocate: Advocate) => void;
}

const AdvocateCard: React.FC<AdvocateCardProps> = ({
  advocate,
  className = '',
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(advocate);
    }
  };

  const cardClasses = [
    styles.card,
    onClick ? styles.clickable : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick ? handleClick : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className={styles.header}>
        <div className={styles.nameSection}>
          <h3 className={styles.name}>
            {advocate.firstName} {advocate.lastName}, {advocate.degree}
          </h3>
          <p className={styles.city}>{advocate.city}</p>
        </div>
        <div className={styles.experience}>
          <span className={styles.experienceText}>
            {advocate.yearsOfExperience} yrs exp.
          </span>
        </div>
      </div>

      <div className={styles.specialties}>
        {advocate.specialties.map((specialty, index) => (
          <Badge
            key={index}
            variant="specialty"
            size="small"
            shape="pill"
            className={styles.specialtyBadge}
          >
            {specialty}
          </Badge>
        ))}
      </div>

      <div className={styles.contact}>
        <span className={styles.phone}>{advocate.phoneNumber}</span>
      </div>
    </div>
  );
};

export default AdvocateCard;