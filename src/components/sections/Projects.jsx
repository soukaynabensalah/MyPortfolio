import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../../data/portfolio";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="projects-carousel">
      <motion.div
        className="projects-carousel__header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="projects-carousel__title">
          Projects
        </h2>
      </motion.div>

      <motion.div
        className="projects-carousel__swiper-wrapper"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <Swiper
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={false}
          initialSlide={1}
          speed={800}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1.5,
            slideShadows: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="projects-swiper"
        >
          {projects.map((project, i) => (
            <SwiperSlide key={project.id} className="projects-swiper__slide">
              <div
                className="projects-slide-card"
              >
                {/* Image */}
                <div className="projects-slide-card__image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="projects-slide-card__image"
                  />
                  <div className="projects-slide-card__image-overlay" />
                </div>

                {/* Content */}
                <div className="projects-slide-card__content">
                  <h3 className="projects-slide-card__title">{project.title}</h3>
                  <p className="projects-slide-card__desc">{project.desc}</p>

                  <div className="projects-slide-card__tags">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="projects-slide-card__tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="projects-slide-card__footer">
                    <button
                      className="projects-slide-card__btn"
                      onClick={() => setSelectedProject(project)}
                    >
                      See more &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="project-modal__close"
                onClick={() => setSelectedProject(null)}
              >
                &times;
              </button>
              
              <div className="project-modal__image-wrapper">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              
              <div className="project-modal__content">
                <h3 className="project-modal__title">{selectedProject.title}</h3>
                
                <div className="project-modal__tags">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="project-modal__tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="project-modal__desc">{selectedProject.longDesc || selectedProject.desc}</p>
                
                <div className="project-modal__links">
                  {selectedProject.github && (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className="project-modal__link">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      Github
                    </a>
                  )}
                  {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" rel="noreferrer" className="project-modal__link project-modal__link--primary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                      Live Project
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
