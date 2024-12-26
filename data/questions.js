const questions = {

    mathematics: [
        { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
        { question: 'What is the square root of 16?', options: ['2', '4', '8', '16'], answer: '4' },
        { question: 'What is the value of pi to 2 decimal places?', options: ['3.14', '3.12', '3.15', '3.10'], answer: '3.14' },
        { question: 'What is 10 divided by 2?', options: ['2', '4', '5', '6'], answer: '5' },
        { question: 'Solve for x: 2x + 3 = 7.', options: ['1', '2', '3', '4'], answer: '2' },
        { question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], answer: '30' },
        { question: 'What is 9 squared?', options: ['18', '27', '81', '99'], answer: '81' },
        { question: 'If a triangle has angles 90°, 45°, and 45°, what type of triangle is it?', options: ['Isosceles', 'Scalene', 'Equilateral', 'Right'], answer: 'Isosceles' },
        { question: 'What is the perimeter of a rectangle with length 4 and width 3?', options: ['7', '12', '14', '24'], answer: '14' },
        { question: 'How many degrees are there in a circle?', options: ['180', '270', '360', '540'], answer: '360' }
    ],
    science: [
        { question: 'What planet is known as the Red Planet?', options: ['Mars', 'Jupiter', 'Venus', 'Saturn'], answer: 'Mars' },
        { question: 'What is the chemical symbol for water?', options: ['O2', 'H2O', 'CO2', 'N2'], answer: 'H2O' },
        { question: 'What gas do plants absorb from the atmosphere?', options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], answer: 'Carbon dioxide' },
        { question: 'What is the powerhouse of the cell?', options: ['Mitochondria', 'Nucleus', 'Ribosome', 'Cytoplasm'], answer: 'Mitochondria' },
        { question: 'Which planet has the most moons?', options: ['Mars', 'Earth', 'Jupiter', 'Saturn'], answer: 'Saturn' },
        { question: 'What is the boiling point of water?', options: ['50°C', '75°C', '100°C', '120°C'], answer: '100°C' },
        { question: 'What is the closest star to Earth?', options: ['Proxima Centauri', 'Sirius', 'Sun', 'Alpha Centauri'], answer: 'Sun' },
        { question: 'Which organ is responsible for pumping blood throughout the body?', options: ['Heart', 'Lungs', 'Brain', 'Kidneys'], answer: 'Heart' },
        { question: 'Which element has the atomic number 1?', options: ['Helium', 'Hydrogen', 'Oxygen', 'Nitrogen'], answer: 'Hydrogen' },
        { question: 'What is the hardest naturally occurring substance?', options: ['Iron', 'Diamond', 'Quartz', 'Steel'], answer: 'Diamond' }
    ],
    history: [
        { question: 'Who was the first president of the USA?', options: ['Abraham Lincoln', 'George Washington', 'John Adams', 'Thomas Jefferson'], answer: 'George Washington' },
        { question: 'In which year did World War II end?', options: ['1945', '1939', '1918', '1965'], answer: '1945' },
        { question: 'Which empire was ruled by Julius Caesar?', options: ['Roman Empire', 'Greek Empire', 'Egyptian Empire', 'Persian Empire'], answer: 'Roman Empire' },
        { question: 'Who discovered America?', options: ['Christopher Columbus', 'Leif Erikson', 'Ferdinand Magellan', 'Marco Polo'], answer: 'Christopher Columbus' },
        { question: 'In what year did the Titanic sink?', options: ['1905', '1912', '1918', '1920'], answer: '1912' },
        { question: 'Who was the leader of Nazi Germany during World War II?', options: ['Adolf Hitler', 'Winston Churchill', 'Joseph Stalin', 'Franklin D. Roosevelt'], answer: 'Adolf Hitler' },
        { question: 'Which country was the first to land a man on the moon?', options: ['USA', 'Soviet Union', 'China', 'Germany'], answer: 'USA' },
        { question: 'Who was known as "The Maid of Orleans"?', options: ['Queen Elizabeth I', 'Joan of Arc', 'Marie Antoinette', 'Catherine the Great'], answer: 'Joan of Arc' },
        { question: 'What was the name of the ship that brought the Pilgrims to America in 1620?', options: ['Santa Maria', 'Mayflower', 'Endeavor', 'Beagle'], answer: 'Mayflower' },
        { question: 'Who was the first man to step on the moon?', options: ['Yuri Gagarin', 'Neil Armstrong', 'Buzz Aldrin', 'Michael Collins'], answer: 'Neil Armstrong' }
    ],
    sports: [
        { question: 'Who is known as the "God of Cricket"?', options: ['Sachin Tendulkar', 'Rahul Dravid', 'Brian Lara', 'Virat Kohli'], answer: 'Sachin Tendulkar' },
        { question: 'What sport is associated with the term "offside"?', options: ['Cricket', 'Football', 'Hockey', 'Basketball'], answer: 'Football' },
        { question: 'How many players are there in a standard cricket team?', options: ['9', '10', '11', '12'], answer: '11' },
        { question: 'Which country won the 2019 ICC Cricket World Cup?', options: ['India', 'Australia', 'England', 'New Zealand'], answer: 'England' },
        { question: 'In tennis, what is the term for a score of zero?', options: ['Love', 'Fault', 'Deuce', 'Advantage'], answer: 'Love' },
        { question: 'Who holds the record for the most runs in One Day Internationals (ODIs)?', options: ['Sachin Tendulkar', 'Virat Kohli', 'Rohit Sharma', 'Brian Lara'], answer: 'Sachin Tendulkar' },
        { question: 'Which famous athlete is known for the quote, "I am the greatest"?', options: ['Michael Jordan', 'Usain Bolt', 'Muhammad Ali', 'Cristiano Ronaldo'], answer: 'Muhammad Ali' },
        { question: 'What do you call it when a bowler delivers a ball that the batsman misses completely in cricket?', options: ['Googly', 'Wide', 'Bouncer', 'Duck'], answer: 'Duck' },
        { question: 'Which sport is known for having a "tackle" but is not a martial art?', options: ['American Football', 'Basketball', 'Rugby', 'Soccer'], answer: 'American Football' },
        { question: 'Which sport involves hitting a ball into a hole with the fewest number of strokes?', options: ['Tennis', 'Golf', 'Baseball', 'Cricket'], answer: 'Golf' }
    ],
};
    


export default questions;
