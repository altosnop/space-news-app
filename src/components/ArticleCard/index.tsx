import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { filterSelector } from '../../store/articles/articlesSelectors';
import { TCardProps } from '../../types/types';
import { East, CalendarToday } from '@mui/icons-material';
import {
	Card,
	CardActions,
	CardContent,
	Typography,
	CardMedia,
} from '@mui/material';

const ArticleCard = ({ id, imgUrl, date, title, description }: TCardProps) => {
	const filter = useAppSelector(filterSelector);

	const newDate = new Date(date);
	const formedDate = newDate.toDateString();
	const shortDescription = `${description.substring(0, 100)}...`;

	const getHighlightedText = (text: string, highlight: string) => {
		const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

		return parts.map((part, index) => (
			<React.Fragment key={index}>
				{part.toLowerCase() === highlight.toLowerCase() ? (
					<mark style={{ backgroundColor: 'rgba(255, 246, 25, 0.63)' }}>
						{part}
					</mark>
				) : (
					part
				)}
			</React.Fragment>
		));
	};

	return (
		<Card
			sx={{
				height: '100%',
				boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<CardMedia sx={{ height: 217 }} image={imgUrl} title={title} />
			<CardContent sx={{ marginBottom: 'auto' }}>
				<Typography
					gutterBottom
					variant='body2'
					color='text.secondary'
					sx={{ display: 'flex', alignItems: 'center' }}
				>
					<CalendarToday sx={{ margin: '0 7px 0 0', width: '18px' }} />
					{formedDate}
				</Typography>
				<Typography gutterBottom variant='h5' component='div'>
					{getHighlightedText(title, filter)}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{getHighlightedText(shortDescription, filter)}
				</Typography>
			</CardContent>
			<CardActions sx={{ padding: '16px' }}>
				<Link to={`/article/${id}`} className='read-more'>
					<Typography
						sx={{
							display: 'flex',
							alignItems: 'center',
							fontWeight: '700',
						}}
					>
						Read more <East sx={{ margin: '0 0 0 5px', width: '15px' }} />
					</Typography>
				</Link>
			</CardActions>
		</Card>
	);
};

export default ArticleCard;
