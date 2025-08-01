'use client';
import { skillCategories } from '../data/skills';
import SpotlightCard from './ui/SpotlightCard';

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--card-bg)] via-transparent to-[var(--card-bg)] opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div
          className="text-center mb-16"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--neon-color)]">
            Skills & Expertise
          </h2>
          <p className="text-lg sm:text-xl text-[var(--text-color)] max-w-2xl mx-auto">
            A showcase of my technical skills and proficiency levels in various technologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <SpotlightCard
              key={categoryIndex}
              spotlightColor={`rgba(var(--neon-rgb), 0.2)`}
              className="p-6 rounded-xl border border-[var(--neon-color)] bg-[var(--card-bg)] shadow-[0_0_15px_rgba(var(--neon-rgb),0.15)]"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={categoryIndex * 200}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[var(--neon-color)]">
                  {<category.icon className="w-6 h-6" />}
                </span>
                <h3 className="text-xl font-bold text-[var(--neon-color)]">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    data-aos="fade-left"
                    data-aos-duration="600"
                    data-aos-delay={skillIndex * 50}
                    data-aos-anchor-placement="center-bottom"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[var(--neon-color)] text-xl">
                        {<skill.icon />}
                      </span>
                      <span className="text-[var(--text-color)] font-medium">
                        {skill.name}
                      </span>
                      <span className="text-[var(--text-color)] ml-auto">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-[var(--card-bg)] rounded-full overflow-hidden border border-[var(--neon-color)] border-opacity-20">
                      <div
                        className="h-full bg-[var(--neon-color)] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                        data-aos="slide-right"
                        data-aos-duration="1000"
                        data-aos-delay={skillIndex * 50}
                        data-aos-anchor-placement="center-bottom"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
