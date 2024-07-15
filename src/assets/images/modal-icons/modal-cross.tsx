import React from "react";

const ModalCross = (props: any) => {
  const { disabled, fill } = props;
  return (
    <svg
      width="21"
      height="22"
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.22803 10.6482C1.22803 8.18904 2.20492 5.83062 3.94379 4.09174C5.68267 2.35287 8.04109 1.37598 10.5002 1.37598C12.9594 1.37598 15.3178 2.35287 17.0567 4.09174C18.7955 5.83062 19.7724 8.18904 19.7724 10.6482C19.7724 13.1073 18.7955 15.4657 17.0567 17.2046C15.3178 18.9435 12.9594 19.9204 10.5002 19.9204C8.04109 19.9204 5.68267 18.9435 3.94379 17.2046C2.20492 15.4657 1.22803 13.1073 1.22803 10.6482ZM10.5002 2.70598C8.39383 2.70598 6.3737 3.54274 4.88424 5.03219C3.39479 6.52165 2.55803 8.54177 2.55803 10.6482C2.55803 12.7546 3.39479 14.7747 4.88424 16.2642C6.3737 17.7536 8.39383 18.5904 10.5002 18.5904C12.6066 18.5904 14.6268 17.7536 16.1162 16.2642C17.6057 14.7747 18.4424 12.7546 18.4424 10.6482C18.4424 8.54177 17.6057 6.52165 16.1162 5.03219C14.6268 3.54274 12.6066 2.70598 10.5002 2.70598ZM13.7958 7.35398C13.9271 7.48525 14.0008 7.66326 14.0008 7.84888C14.0008 8.03449 13.9271 8.21251 13.7958 8.34378L11.49 10.6482L13.7958 12.9526C13.9273 13.084 14.0011 13.2623 14.0011 13.4482C14.0011 13.6341 13.9273 13.8123 13.7958 13.9438C13.6644 14.0752 13.4861 14.1491 13.3002 14.1491C13.1143 14.1491 12.9361 14.0752 12.8046 13.9438L10.5002 11.638L8.19583 13.9438C8.13074 14.0089 8.05348 14.0605 7.96845 14.0957C7.88341 14.1309 7.79227 14.1491 7.70023 14.1491C7.60819 14.1491 7.51705 14.1309 7.43201 14.0957C7.34698 14.0605 7.26971 14.0089 7.20463 13.9438C7.13954 13.8787 7.08792 13.8014 7.0527 13.7164C7.01747 13.6314 6.99934 13.5402 6.99934 13.4482C6.99934 13.3561 7.01747 13.265 7.0527 13.18C7.08792 13.0949 7.13954 13.0177 7.20463 12.9526L9.51043 10.6482L7.20463 8.34378C7.07319 8.21234 6.99934 8.03406 6.99934 7.84818C6.99934 7.66229 7.07319 7.48402 7.20463 7.35258C7.33607 7.22114 7.51434 7.14729 7.70023 7.14729C7.88611 7.14729 8.06439 7.22114 8.19583 7.35258L10.5002 9.65838L12.8046 7.35258C12.8697 7.28739 12.9469 7.23567 13.0319 7.20038C13.117 7.16509 13.2082 7.14693 13.3002 7.14693C13.3923 7.14693 13.4835 7.16509 13.5685 7.20038C13.6536 7.23567 13.7308 7.28879 13.7958 7.35398Z"
        fill={disabled ? 'grey' : fill}
      />
    </svg>
  );
};

export default ModalCross;
