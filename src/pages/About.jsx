import React from 'react';
import styles from './About.module.css';

const About = () => {
    const teamMembers = [
        {
            name: 'Carlos Vales',
            linkedin: 'https://www.linkedin.com/in/carlos-vales/',
            github: 'https://github.com/carlosvales',
            photo: '/images/equipo/carlos-vales.jpg',
        },
        {
            name: 'Victor Riddlestone',
            linkedin: 'https://www.linkedin.com/in/victor-riddlestone/',
            github: 'https://github.com/Vic102',
            photo: '/images/equipo/victor-r.jpg',
        },
        {
            name: 'Harald Kleinschrot',
            linkedin: 'https://www.linkedin.com/in/haraldkleinschrot/',
            github: 'https://github.com/Kaaxerd',
            photo: '/images/equipo/harald-nilointentoescribir.jpg',
        },
        {
            name: 'Jorge Casas',
            linkedin: 'https://www.linkedin.com/in/jorgecasase/',
            github: 'https://github.com/jorgecasase',
            photo: '/images/equipo/jorge-casas.jpg',
        },
        {
            name: 'Adrián Calderón',
            linkedin: 'https://www.linkedin.com/in/jorgecasase/',
            github: 'https://github.com/acalde02',
            photo: '/images/equipo/adrian-calderon.jpeg',
        },
    ];

    return (
        <div className={styles['about-container']}>
            <h1 className={styles.title}>Sobre nosotros</h1>
            <p className={styles.description}>
                Bienvenido a nuestra página más personal.
            </p>
            <p className={styles.description}>
                Aquí podrás ver más información sobre nosotros y será posible tener nuestro contacto.
            </p>

            <h2 className={styles.subtitle}>Conócenos</h2>
            <div className={styles['team-grid']}>
                {teamMembers.map((member, index) => (
                    <div key={index} className={styles['team-card']}>
                        <img
                            src={member.photo}
                            alt={`${member.name}'s LinkedIn`}
                            className={styles['team-photo']}
                        />
                        <div className={styles['team-info']}>
                            <h3 className={styles['team-name']}>{member.name}</h3>
                            <div className={styles['team-links']}>
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    LinkedIn
                                </a>
                                {' | '}
                                <a
                                    href={member.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.link}
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h2 className={styles.subtitle}>Nuestras Habilidades</h2>
            <div className={styles['skills-grid']}>
                <div className="skill-card">Node.js</div>
                <div className="skill-card">Python</div>
                <div className="skill-card">MongoDB</div>
                <div className="skill-card">Git</div>
                <div className="skill-card">Cambiar Epocas</div>
                <div className="skill-card">Cambiar Batch Size</div>
                <div className="skill-card">Python</div>
            </div>

            <blockquote className={styles.mission}>
                "Trabajamos para crear soluciones innovadoras que mejoran la vida de las personas."
            </blockquote>

            <h2 className={styles.subtitle}>Lo que dicen de nosotros</h2>
            <div className={styles.testimonials}>
                <div className={styles.testimonial}>
                    <p>
                        "El equipo de ViMad superó todas mis expectativas con su profesionalismo y calidad de trabajo."
                    </p>
                    <strong>- Eduardo Rueda</strong>
                </div>
                <div className={styles.testimonial}>
                    <p>
                        "Increíbles habilidades técnicas y trabajo en equipo. ¡Altamente recomendados!"
                    </p>
                    <strong>- Ignacio Pérez</strong>
                </div>
            </div>
        </div>
    );
};

export default About;
