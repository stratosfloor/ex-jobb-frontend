import styles from './ActiveReview.module.css';

const ActiveReview = ({ activeReview }) => {
	console.log(activeReview);
	return (
		<div className={styles.container}>
			{' '}
			{activeReview ? <h2>{activeReview[0].name}</h2> : null}
			{activeReview
				? activeReview.map((review, idx) => {
						return <p key={idx}>{review.review}</p>;
				  })
				: null}
			;
		</div>
	);
};

export default ActiveReview;
