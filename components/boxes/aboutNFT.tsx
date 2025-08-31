import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const AboutNFT = () => {
  const [expandedSection, setExpandedSection] = useState<"mmass" | "practice" | null>(null);

  // Карта соответствия якорей и секций
  const anchorToSectionMap: Record<string, "mmass" | "practice"> = {
    "mmass-foundation": "mmass",
    "mmass-goal": "mmass",
    "experimental-methodology": "mmass",
    "tpm-impact": "mmass",
    "mmass-research": "mmass",
    "mmass-approach": "mmass",
    "parenting-lab": "mmass",
    "em-definition": "practice",
    "tpm-description": "practice",
    "em-topics": "practice",
    "living-thinking": "practice",
  };

  // Обработчик клика по якорным ссылкам
  const handleInternalLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const targetSection = anchorToSectionMap[id];

    if (targetSection) {
      setExpandedSection(prev => prev === targetSection ? prev : targetSection);
      
      // Небольшая задержка для гарантии рендеринга секции перед прокруткой
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      // Для якорей вне секций
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  // Эффект для обработки начального URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const targetSection = anchorToSectionMap[id];
      
      if (targetSection) {
        setExpandedSection(targetSection);
        
        // Прокрутка после рендеринга секции
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Для якорей вне секций
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);

  const toggleSection = (section: "mmass" | "practice") => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <AboutNFTContainer>
      <Content>
        <Title>
          Цифровое издательство Международной методологической ассоциации (ММАСС)
        </Title>
        
        <Paragraph>
          предоставляет доступ к эксклюзивным подлинным<FootnoteLink href="#footnote-1">1</FootnoteLink> материалам, которые были 
          созданы под эгидой ММАСС за десятилетия ее существования.
        </Paragraph>

        <FootnotesContainer>
          <FootnoteItem id="footnote-1">
            <sup>1</sup> Сохранение подлинности материалов является ценностью для ММАСС. В современном цифровом мире в ходе своей практики ММАСС и причастные к ней заинтересованные люди неоднократно имели дело с искажением важных культурных артефактов и их частей (в частности, материалы кружка ММК), что ведет к губительным для мысли последствиям. Во избежание такого рода ситуаций ММАСС в своём Цифровом издательстве использует технологию блокчейна.
          </FootnoteItem>
        </FootnotesContainer>
        
        <ExpandButton 
          onClick={() => toggleSection('mmass')} 
          isActive={expandedSection === 'mmass'}
        >
          Подробнее о ММАСС
          <ArrowIcon>{expandedSection === 'mmass' ? '↑' : '↓'}</ArrowIcon>
        </ExpandButton>

        {expandedSection === 'mmass' && (
          <ExpandedContent>
            <Paragraph id="mmass-foundation">
              Международная методологическая ассоциация (ММАСС) основана в 1989 году Сергеем Валентиновичем Поповым. 
              Будучи учеником Георгия Петровича Щедровицкого, активным участником Московского методологического кружка (ММК) 
              и практикующим методологом, Сергей Попов развил и переосмыслил методологические идеи Кружка, совместно с 
              единомышленниками Ассоциации открыв собственное направление, которое в 2016 оформилось в самостоятельную 
              методологическую дисциплину – Экспериментальную методологию.
            </Paragraph>
            <Paragraph id="mmass-goal">
              Главной целью ММАСС с момента ее создания является сохранение и распространение практики развития мышления, 
              повышение роли и статуса мышления во всех сферах человеческой жизни.
            </Paragraph>
            <Paragraph id="experimental-methodology">
              Существующая схема организации человеческого интеллекта, надежная закреплённая в структурах институционального 
              образования, основана на накоплении и распространении знаний. Экспериментальная методология предлагает иной принцип – 
              «важно не знать, а мочь включаться в коллективное мышление», а нужные знания либо привлекать по необходимости, 
              либо строить новые. Частично Экспериментальная методология опирается на разработки практик мышления ММК, известных 
              как организационно-деятельностные игры (ОДИ), для которых был разработан метод коллективного решения задач в условиях 
              неопределенности. Но Экспериментальная методология пошла дальше и претендует на разворачивание альтернативной схемы 
              организации интеллектуальной сферы человечности. Основной движущей силой Экспериментальной методологии является 
              самостановящееся мышление, с 2016 года были разработаны специальные мероприятия, позволяющие неофитам получать опыт 
              быстрого и техничного вхождения в мышление, по ходу которого оснащать себя необходимыми техниками и интеллектуальными 
              способностями: рефлексия, воображение, чувствительность к реальности, способность к совместности, способность к 
              пониманию, способность к схематизации и «перемножении» схем<FootnoteLink href="#scheme-multiplication">3</FootnoteLink> и др. Эти мероприятия получили название Тренинги на 
              постановку мышления (ТПМ)<FootnoteLink href="#tpm-announcements">4</FootnoteLink>.
            </Paragraph>
            <Paragraph id="tpm-impact">
              За счет ТПМ в ареале ММАСС появляется все более широкий слой людей, имеющих опыт вхождения в мышление, становится 
              возможным организовывать содержательные мероприятия разного уровня глубины, разворачивая интеллектуальную сферу 
              человеческого на сложных практических и жизненных ситуациях.
            </Paragraph>
            <Paragraph id="mmass-research">
              ММАСС ведет собственные исследования и разработки новых методологических подходов. Это позволяет сохранять интенсивный 
              темп интеллектуальной работы и не становиться заложником уже разработанных методологических инструментов.
            </Paragraph>
            <Paragraph id="mmass-approach">
              С 2020 года ММАСС полностью изменила подход к организации своей деятельности – вместо распространенного среди бизнеса 
              образовательного консалтинга, де факто работающего в знаниевой парадигме, ММАСС работает с людьми и их интеллектом. 
              Ассоциация осуществляет полный цикл методологических, научных, исследовательских и экспериментальных разработок, не 
              ставя себя в зависимость от заказчиков и спонсоров. Такой подход близок к схеме организации древних мыслительных школ 
              (Пифагор<FootnoteLink href="#pythagoras-vessel">5</FootnoteLink>, Аристотель, Платон) и первых средневековых университетов, которые были основными источниками мысли европейской 
              цивилизации.
            </Paragraph>
            <Paragraph id="parenting-lab">
              Особое внимание ММАСС уделяет теме становления детей с точки зрения разворачивания интеллектуальных способностей. Есть 
              постоянно действующая Лаборатория Родительства, в которой рефлектируется опыт родительства, а также разрабатываются и 
              проверяются гипотезы о возможном участии родителей в становлении детей<FootnoteLink href="#parenting-concept">6</FootnoteLink>.
            </Paragraph>

            <FootnotesContainer>
              <FootnoteItem id="scheme-multiplication"><sup>3</sup> Подробнее о «перемножении» схем см. <ExternalLink href="https://www.mmass.pro" target="_blank" rel="noopener noreferrer">Ненаписанное, но обозначенное: «Техника перемножения схем»</ExternalLink>.</FootnoteItem>
              <FootnoteItem id="tpm-announcements"><sup>4</sup> Телеграм-канал с анонсами тренингов: <ExternalLink href="https://t.me/MMASSpublic" target="_blank" rel="noopener noreferrer">@MMASSpublic</ExternalLink>.</FootnoteItem>
              <FootnoteItem id="pythagoras-vessel"><sup>5</sup> Подробнее см. артефакт <ExternalLink href="https://www.mmass.pro" target="_blank" rel="noopener noreferrer">«Сосуд Пифагора»</ExternalLink>, раздел «Вавилонская библиотека», подраздел «Апокрифы».</FootnoteItem>
              <FootnoteItem id="parenting-concept"><sup>6</sup> Подробнее см. текст <ExternalLink href="https://www.mmass.pro" target="_blank" rel="noopener noreferrer">«Понятие становления»</ExternalLink> в разделе «Материалы ММАСС», подраздел «Лаборатория родительства».</FootnoteItem>
            </FootnotesContainer>
          </ExpandedContent>
        )}

        <Paragraph>
          Материалы, публикуемые издательством – артефакты<FootnoteLink href="#footnote-2">2</FootnoteLink> ММАСС, созданные в разное 
          время ее деятельности и имеющие привязку к практике Экспериментальной методологии.
        </Paragraph>

        <FootnotesContainer>
          <FootnoteItem id="footnote-2">
            <sup>2</sup> Артефакт – искусственно (arte) сделанный/созданный (factus) объект, имеющий идеальное содержание, заложенное создателем в ту или иную материальную оболочку. Идеальное содержание скрыто в артефакте, основная интрига встречи с артефактом – разгадать/выделить идеальное содержание, проникнув в замысел создателя.
          </FootnoteItem>
        </FootnotesContainer>
        
        <ExpandButton 
          onClick={() => toggleSection('practice')} 
          isActive={expandedSection === 'practice'}
        >
          Подробнее о практике Экспериментальной методологии
          <ArrowIcon>{expandedSection === 'practice' ? '↑' : '↓'}</ArrowIcon>
        </ExpandButton>

        {expandedSection === 'practice' && (
          <ExpandedContent>
            <Paragraph id="em-definition">
              Экспериментальная методология – авторская методологическая дисциплина, основной задачей которой является исследование 
              возможностей техничного вызова коллективного мышления и конфигурирования «ризомы» интеллекта<FootnoteLink href="#rhizome-concept">7</FootnoteLink> в сложных проблемных сферах 
              организации человеческой жизни, где существующие способы мысли перестают работать. Экспериментальная методология – практика<FootnoteLink href="#practice-definition">8</FootnoteLink> 
              становления человеческого интеллекта<FootnoteLink href="#intellect-definition">9</FootnoteLink>.
            </Paragraph>
            <Paragraph id="tpm-description">
              Основным плацдармом для Экспериментальной методологии с 2016 года служат специальные мероприятия – Тренинги на постановку 
              мышления (ТПМ)<FootnoteLink href="#tpm-announcements-2">10</FootnoteLink>, которые ММАСС проводит несколько раз в год. За счет постоянной работы трех интенций: исследовательской, 
              экспериментальной и инструментальной, менее чем за десятилетие ММАСС удалось отработать метод коллективного вхождения в 
              мышление, позволяющий без длительной академической подготовки здравомысленным, активным и свободным людям включаться в 
              мышление, оснащаясь по мере этого движения нужными техниками (техника работы с понятиями, техника схематизации, техника 
              герменевтики и др.). 
            </Paragraph>
            <Paragraph id="em-topics">
              По мере разворачивания дисциплины в совместном движении с активом ММАСС постоянно формируется поле тем, важнейших для 
              организации человеческой жизни, но недостаточно интеллектуально и инструментально обустроенных:
            </Paragraph>
            <List>
              <li>Самоорганизация</li>
              <li>Ориентация</li>
              <li>Творение</li>
              <li>Власть</li>
              <li>Деньги</li>
              <li>Социальность</li>
              <li>Организация</li>
              <li>Возможности</li>
              <li>и др.</li>
            </List>
            <Paragraph id="living-thinking">
              Дисциплина экспериментальной методологии позволяет осуществлять критику и проблематизацию существующего дискурса и строить 
              нужные и актуальные мыслительные инструменты для оснащения человеческих единиц в их попытках продвинуться в нужной теме – 
              так реализуется «живое мышление»<FootnoteLink href="#discipline-organization">11</FootnoteLink>.
            </Paragraph>

            <FootnotesContainer>
              <FootnoteItem id="rhizome-concept"><sup>7</sup> Подробнее о «ризоме» интеллекта см. <ExternalLink href="https://www.mmass.pro" target="_blank" rel="noopener noreferrer">видео «К вопросу о ризоме интеллекта»</ExternalLink> в разделе «Экспериментальная методология», подразделе «Концепты ЭМ».</FootnoteItem>
              <FootnoteItem id="practice-definition"><sup>8</sup> Практика понимается не как реализация теории, а как самостоятельная экспериментальная деятельность, в рамках которой появляются концепты и теории, использующиеся инструментально.</FootnoteItem>
              <FootnoteItem id="intellect-definition"><sup>9</sup> Интеллект – общее название различных комбинаций интеллектуальных феноменов, таких как: сознание, воображение, рефлексия, память, понимание, опыт, воля, осмысленное действие, чувствительность к реальности и др. и кроме указанных феноменов появление поверх них метафеномена – мышления, который проявляется при встрече организованных тем или иным способом феноменов с элементами Другого (внечеловеческого) – идеями, сущностями, «числами и чертежами» (Пифагор) и пр., и появления «вещей мысли»: понятий, категорий, схем, ... Разум понимается как рефлектирующий себя интеллект. Подробнее – см. в <ExternalLink href="https://www.mmass.pro" target="_blank" rel="noopener noreferrer">видео «К вопросу о ризоме интеллекта»</ExternalLink>, раздел «Экспериментальная методология», подраздел «Концепты ЭМ».</FootnoteItem>
              <FootnoteItem id="tpm-announcements-2"><sup>10</sup> Телеграм-канал с анонсами тренингов: <ExternalLink href="https://t.me/MMASSpublic" target="_blank" rel="noopener noreferrer">@MMASSpublic</ExternalLink>.</FootnoteItem>
              <FootnoteItem id="discipline-organization"><sup>11</sup> Дисциплинарная организация мышления обсуждается Поповым С.В. в его статье <ExternalLink href="https://www.kentavr.mathedu.ru/text/kentavr_2001_26/p3/" target="_blank" rel="noopener noreferrer">«Методология организации общественных изменений»</ExternalLink>, опубликованной в 2001 году в 26 выпуске альманаха «Кентавр».</FootnoteItem>
            </FootnotesContainer>
          </ExpandedContent>
        )}

        <Paragraph>
          За каждым артефактом стоит тот или иной мыслительный опыт из экспериментальной 
          методологической практики: герменевтический опыт, опыт построения понятий и концептов, 
          опыт интерпретации, осмысление феноменов и т.д.
        </Paragraph>
        
        <Paragraph>
          Если читатель озабочен тем или иным содержательным вопросом, структура текстов 
          издательства позволяет каждому построить свою уникальную траекторию встречи с артефактами. 
          К текстовым артефактам Издательства прилагается аннотация, служащая как для настройки 
          на чтение, так и для ориентации в пространстве содержательных «узлов» текста с указанием 
          ссылок на дополнительные артефакты. Система поиска на сайте позволяет искать материалы 
          не только по их названию, но и по ключевым словам.
        </Paragraph>
        
        <Paragraph>
          Издательство на регулярной основе пополняется артефактами, о новых публикациях можно 
          узнавать в телеграм-канале ЦИ ММАСС <ExternalLink href="https://t.me/mmass_izdat" target="_blank" rel="noopener noreferrer">@mmass_izdat</ExternalLink>.
        </Paragraph>
        
        <Paragraph>
          Все тексты и видео защищены от копирования и удостоверены ММАСС. Доступ к материалам 
          осуществляется через NFT, которые гарантируют подлинность каждого артефакта и фиксируют 
          его ограниченный тираж.
        </Paragraph>
        
        <Paragraph>
          В случае, если тираж уже полностью выкуплен, система инструментов Издательства позволяет 
          приобрести ранее опубликованные материалы у других пользователей (
            <InternalLink 
              href="#instruction-4" 
              onClick={(e) => handleInternalLinkClick(e, "#instruction-4")}
            >
              подробнее см. Инструкцию 4 «Как купить или продать NFT»
            </InternalLink>
          ).
        </Paragraph>
      </Content>
    </AboutNFTContainer>
  );
};

// Styled components
const AboutNFTContainer = styled.div`
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
  line-height: 1.3;
  scroll-margin-top: 180px; /* Отступ для якорных ссылок */

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #333;
  scroll-margin-top: 180px; /* Отступ для якорных ссылок */
`;

const ExpandButton = styled.button<{ isActive: boolean }>`
  background: none;
  border: none;
  color: #333;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 10px 0;
  margin: 15px 0;
  display: flex;
  align-items: center;
  font-weight: 600;
  transition: color 0.3s;

  &:hover {
    color: #000;
  }
`;

const ArrowIcon = styled.span`
  margin-left: 10px;
  font-size: 1.2rem;
`;

const ExpandedContent = styled.div`
  margin-top: 15px;
  padding-left: 15px;
  background-color: #f7f6f6;
  border-left: 3px solid #a3a3a3ff;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 20px 0;
  padding-left: 25px;

  li {
    position: relative;
    padding-left: 15px;
    margin-bottom: 10px;
    font-size: 1.1rem;
    line-height: 1.6;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #333;
      font-size: 1.4rem;
      line-height: 1;
    }
  }
`;

const FootnotesContainer = styled.div`
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 0.9rem;
  color: #666;
`;

const FootnoteItem = styled.p`
  margin-bottom: 10px;
  line-height: 1.5;
  scroll-margin-top: 180px; /* Отступ для якорных ссылок */
`;

const FootnoteLink = styled.a`
  color: #333;
  text-decoration: none;
  margin: 0 2px;
  font-size: 0.8rem;
  vertical-align: super;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  border-radius: 50%;
  background-color: #f1f1f1;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
    text-decoration: none;
  }
`;

const ExternalLink = styled.a`
  color: #333;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const InternalLink = styled.a`
  color: #333;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export default AboutNFT;