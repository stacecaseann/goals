export default function showConfetti()
{
    const container = document.querySelector('.confetti-container');
    for (let i=0; i<100;i++)
    {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        confetti.style.animationDelay = `${Math.random()}s`;
        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }

}