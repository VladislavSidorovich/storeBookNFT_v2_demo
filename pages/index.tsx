"use client";
import React, {useRef, FormEvent, MutableRefObject, useState} from 'react';
import SendForm from "../components/modal/SendForm";
import type { NextPage } from "next";
import Image from "next/image";
import CustomConnectButton from "../components/CustomConnectButton";
import CustomSlider from "../components/CustomSlider";
import CustomSliderSearch from "../components/CustomSliderSearch";
import CustomSliderConceptsEM from "../components/CustomSliderConceptsEM";
import CustomSliderMMACC from "../components/CustomSliderMMACC";
import CustomSliderMMACCReports from "../components/CustomSliderMMACCReports";
import CustomSliderInterpretations from "../components/CustomSliderInterpretations";
import CustomSliderСlosedSection from "../components/CustomSliderСlosedSection";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import cn from "classnames";
import { useAppSelector } from "../store/hooks";
import BookIframe from "../components/iframe/BookIframe";
import PreviewIframe from "../components/iframe/PreviewIframe";
import styled from 'styled-components';
import closeModalicon from "../static/svg/closeModal.svg"
import like from "../static/svg/like.svg"
import AboutNFT from "../components/boxes/aboutNFT";
import About from "../components/boxes/about";
//import styles from "../styles/Home.module.css";
//import AboutNFT from "../components/boxes/aboutNFT";
//import Instruction from "../components/boxes/instruction";
//import CardList from "../components/cards/cardList";

const variants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: "0%",
  },
};

const Container = styled.div`
  display: flex;
  margin: 20px;
  margin-left: 0px;
  @media screen and ( max-width: 700px ){
    margin: 0px;
  }  
`;

const TabContainer = styled.div`
  display: flex;
  border: 2px solid #333; /* Цвет бордера */
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 30px;
`;

const TabContainerMMACC = styled.div`
  display: flex;
  border: 2px solid #333; /* Цвет бордера */
  border-radius: 50px;
  overflow: hidden;
  width: 60%;
  margin-bottom: 30px;
  @media screen and ( max-width: 700px ){
    width: 100%;
  }  
   @media screen and ( max-width: 800px ) and ( min-width: 701px ){
    width: 100%;
  }  
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 10px 25px;
  border: none;
  background-color: ${({ active }) => (active ? '#fff' : '#000')}; /* Цвет фона вкладки */
  color: ${({ active }) => (active ? '#000' : '#fff')}; /* Цвет текста вкладки */
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-radius 0.3s, z-index 0.3s;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border-radius: ${({ active }) => (active ? '50px' : '0')};
  z-index: ${({ active }) => (active ? 1 : 0)};

  &:not(:first-child) {
    margin-left: -2px; /* Убираем двойной бордер между кнопками */
  }

  &:focus {
    outline: none; /* Убираем стандартную подсветку при фокусе */
  }

  &:hover {
    background-color: ${({ active }) => (active ? '#fff' : '#000')}; /* Цвет фона при наведении */
  }
    @media screen and ( max-width: 700px ){
    font-size: 11px;
  }
`;

// Стили для контейнера формы
const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1vw;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
  color: #fff; // Цвет текста

  @media screen and ( max-width: 700px ){
    margin: 0px;
    width: 100%;
  }
`;

// Стили для контейнера вкладок (в данном случае для полей ввода)
const TabContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  width: 100%;
  max-width: 400px;
  margin-top: 20px
`;

// Стили для полей ввода
const Input = styled.input`
  border: 2px solid #333;
  border-radius: 25px;
  padding: 14px 20px;
  margin: 10px 0;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  background-color: transparent; // Прозрачный фон
  color: #fff; // Цвет текста
  outline: none;
  margin-bottom: 0; 
  &::placeholder {
    color: #888; // Цвет плейсхолдера
  }
`;

// Стили для кнопки
const Button = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 25px;
  padding: 14px 20px;
  margin: 20px 0;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;

  &:hover {
    background-color: #f0f0f0;
  }
`;



const ContainerEmail = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000;
  color: #fff;
  box-sizing: border-box;
  width: 100%;
  margin-left:auto;
  margin-right:auto;
    @media (max-width: 700px) {
      width: 100%;
      margin: 0;
      padding: 10px;
      padding-top: 30vw;
  }
      @media (max-width: 450px) {
      width: 100%;
      margin: 0;
      padding: 10px;
      padding-top: 0vw;
  }
`;
const Header = styled.h1`
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  text-align: left;
  padding-left: 70px;
    @media (max-width: 700px) {
    font-size: 24px;
    text-align: left;
    padding-left: 0;
  }
`;

const SubHeader = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 40px;
  padding-left: 70px;
  text-align: left;
  max-width: 900px;
      @media (max-width: 700px) {
    font-size: 14px;
    text-align: left;
    padding-left: 0;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: 0 70px;
  @media (max-width: 700px) {
    padding: 0;
    width: 100%;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: #888;
  margin: 0 20px;
  @media (max-width: 700px) {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: left;
  width: 20vw;
  @media (max-width: 700px) {
    font-size: 20px;
    text-align: left;
    width: 80vw;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 9px;
`;

const CheckboxLabel = styled.label<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: ${props => (props.isChecked ? '#fff' : '#888')};
  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 0.8vw;
  height: 0.6vw;
  margin-left: 0;
  @media (max-width: 700px) {
    width: 16px;
    height: 16px;
  }
`;



const FormContainer = styled.div`
  display: flex;
  align-items: left;
  border: 1px solid #888;
  border-radius: 60px;
  overflow: hidden;
  margin-top: 60px;
  width: 55%;
  max-width: 800px;
  margin-left: 70px;
  @media (max-width: 700px) {
    width: 100%;
    margin: 20px 0;
  }
`;

const InputEmail = styled.input`
  flex: 1;
  padding: 14px 20px;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 0px;

  &::placeholder {
    color: #888;
  }

  &:hover {
    background-color: transparent;
  }

  &:focus {
    background-color: transparent;
    outline: none; /* Убирает стандартную обводку браузера при фокусе */
  }

  @media (max-width: 700px) {
    font-size: 14px;
    padding: 12px 16px;
  }

  &:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: transparent !important; /* Прозрачный фон */
    color: fieldtext !important;
  }
`;




const ButtonEmail = styled.button`
  padding: 14px 25px;
  border: none;
  border-radius: 60px;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background-color: #f0f0f0;
  }
    @media (max-width: 700px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;

//sheet 2



type ItemKey = 'item1' | 'item2' | 'item3' | 'item4' | 'item5' | 'item6' | 'item7' | 'item8';

const itemLabels: Record<ItemKey, string> = {
  item1: 'Иванов Ум человеческий',
  item2: 'Фрагменты из записки Р. Зорге тов. Сталину в мае 1943 года',
  item3: 'Франсиско Варела. Отрывок из выступления на семинаре в Национальном центре научных исследований (стенограмма). Париж, 2000г.',
  item4: 'Доклад Попова С.В. "Дети и деньги"',
  item5: 'Материалы диспутов ММАСС на тему «Обустройство»',
  item6: 'Доклад Попова С.В. «Обустройство как эманация Духа»',
  item7: 'Концепт: Собственное содержание',
  item8: 'Концепт: Родовая схема'
};

 //end sheet2

const Home: NextPage = () => {
  const { isHidden, bookIframe, previewIframe } = useAppSelector(
    (state) => state.order
  );
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState(false);


  const [activeTabMethodology, setActiveTabMethodology] = useState<string>('Концепты ЭМ');
  const [activeTabReports, setActiveTabReports] = useState<string>('Апокрифы');
  const [activeTabMMACC, setActiveTabMMACC] = useState<string>('Доклады и сообщения');
  

  //sheet1

  const formRef1 = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (formRef1.current) {
      try {
        const formData = new FormData(formRef1.current);
        const data = new URLSearchParams();
        formData.forEach((value, key) => {
          data.append(key, value.toString());
        });
  
        const response = await fetch("https://script.google.com/macros/s/AKfycbwoRyTztboTljyUmODTcU15_HEs-N8XBKDIztmuW3RMuPLq2DTeYJjujFTJ82BJJkuE/exec", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data,
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.json();
        console.log(result);
        setIsModalOpen(true);
      } catch (err) {
        console.error(err);
        alert("There was an error submitting the form");
      }
    }
  };

  //end sheet1


   //sheet2

  const formRef2 = useRef<HTMLFormElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [checkedItems, setCheckedItems] = useState<Record<ItemKey, boolean>>({
    item1: false,
    item2: false,
    item3: false,
    item4: false,
    item5: false,
    item6: false,
    item7: false,
    item8: false,
  });

  const handleCheckboxChange = (item: ItemKey) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [item]: !prevState[item]
    }));
  };

  
  const handleSubmitCheckbox = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formRef2.current) {
      try {
        // Собираем выбранные элементы
        const selectedItems = (Object.keys(checkedItems) as ItemKey[])
          .filter((key) => checkedItems[key])
          .map((key) => ({
            item: key,
            label: itemLabels[key]
          }));
  
        const formData = new FormData(formRef2.current);
        const email = formData.get('emailChek') || '';

        // Проверка наличия email
        if (!email) {
          console.error('Email is missing');
          alert('Email is missing');
          return;
        }

        console.log('Email:', email);
        console.log('Selected Items:', selectedItems);
  
        formData.append('selectedItems', JSON.stringify(selectedItems));
        formData.append('email', email.toString());

        const data = new URLSearchParams();
        formData.forEach((value, key) => {
          data.append(key, value.toString());
        });

        const response = await fetch('https://script.google.com/macros/s/AKfycbwZsKswevZRfKZF79MCwJkx42nfxoFF1fqvrq7L2Q8Z6qmyB1lrn99v5dVqD3lBC_fl/exec', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data.toString()
        });
        
        setIsModalOpen(true);

        console.log(isModalOpen);


        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Server response:', result);

        //alert('Data submitted successfully!');
        console.log(isModalOpen);
        setIsModalOpen(true);
/*
        if (result.msg === 'Data submitted successfully!') {
          alert('Data submitted successfully!');
        } else {
          alert('Error submitting data');
        }*/
      } catch (error) {
       /* console.error('Error:', error);
        alert('Error submitting data');*/
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

   //end sheet2

  return (
    <>
      <header className="container wrap header">
        <div className="logo wrap">
          <Image
            className="logo__img"
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
          />
          <span className="logo__text">
            <b>
              Международная методологическая <br /> ассоциация (ММАСС)
            </b>
            Цифровое издательство
          </span>
        </div>
        <button
          onClick={() => setMenu(!menu)}
          className={cn("btn_menu", { is_active: menu })}
          id="btn_menu"
        >
          <span></span>
        </button>
        <nav className="nav wrap" id="nav">
          {/*
					<button 
						onClick={() => setLogin(true)}
						className="nav__link login">
						Войти
					</button>
					<button
						onClick={() => setLogin(true)} 
						className="nav__link signup">
						Зарегистрироваться
					</button>
					<a className="btn btn_3" target="_blank" href="#">Подключить криптокашелёк</a>*/}
          <CustomConnectButton />
        </nav>
        <AnimatePresence>
          {menu && (
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={variants}
              transition={{ duration: 0.4, ease: "linear" }}
              className="nav wrap"
              id="nav"
            >
              {/*
							<button 
								onClick={() => setLogin(true)}
								className="nav__link login">
								Войти
							</button>
							<button
								onClick={() => setLogin(true)} 
								className="nav__link signup">
								Зарегистрироваться
							</button>
							<a className="btn btn_3" target="_blank" href="#">Подключить криптокашелёк</a>*/}
              <CustomConnectButton />
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

     <AboutNFT/>

      <section className="instruction" id="instruction">
        <div className="container">
          <div className="wrap title">
            <h2>Инструкция</h2>
            <p>
              Инструкция для тех, кто ранее не сталкивался с криптовалютами: Для
              покупки NFT Вам необходимо:
            </p>
          </div>
          <ol className="wrap">
            <li>
              Создать криптокошелек <br />
              OKX
              <a
                href="https://drive.google.com/file/d/16xO1Lr_km13KWJcZIEFw6oPCz4-vwKuF/view?usp=sharing"
                target="_blank"
              >
                Как создать кошелек?
              </a>
            </li>
            <li>
              Купить криптовалюту <br />
              на кошелек
              <a
                href="https://drive.google.com/file/d/1O7Y480gsMMJWV1eAE04_78naSf5YvsMG/view?usp=sharing"
                target="_blank"
              >
                Как купить криптовалюту?
              </a>
            </li>
            <li>
              Создать NFT нужной Вам <br />
              статьи на данном сайте
              <a
                href="https://drive.google.com/file/d/138TzHvksewxeKLv1uroNgK5mcn6OWnsa/view"
                target="_blank"
              >
                Как купить NFT?
              </a>
            </li>
            <li>
              Купить или продать <br /> NFT на маркетплейсе
              <a
                href="https://drive.google.com/file/d/1joAKIYR4-8HtPDX8NF6wVd01TbpBkJss/view"
                target="_blank"
              >
                Как купить или продать NFT?
              </a>
            </li>
          </ol>
        </div>
      </section>
      
      <section className="products" id="products">
        <div className="container">
          <AnimatePresence mode="wait">
                <CustomSliderSearch/>
          </AnimatePresence>
        </div>
      </section>
      
      <section className="products" id="products">
        <div className="container">
          <h2>Вавилонская библиотека</h2>
          <Container>
            <TabContainer>
                <Tab
                active={activeTabReports === 'Апокрифы'}
                onClick={() => setActiveTabReports('Апокрифы')}
                >
                  Апокрифы
                </Tab>
                <Tab
                active={activeTabReports === 'Интерпретации'}
                onClick={() => setActiveTabReports('Интерпретации')}
                >
                  Интерпретации
                </Tab>
            </TabContainer>
          </Container>
            <AnimatePresence mode="wait">
            {activeTabReports === 'Апокрифы' && (
              <motion.div
                key="Апокрифы"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CustomSlider />
              </motion.div>
            )}
            {activeTabReports === 'Интерпретации' && (
              <motion.div
                key="Интерпретации"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CustomSliderInterpretations />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>


      <section className="products" id="products">
        <div className="container">
        <h2>
            Экспериментальная методология
        </h2>
        <Container>
            <TabContainer>
                <Tab
                active={activeTabMethodology === 'Концепты ЭМ'}
                onClick={() => setActiveTabMethodology('Концепты ЭМ')}
                >
                  Концепты ЭМ
                </Tab>
            </TabContainer>
          </Container>
          <CustomSliderConceptsEM/>
        </div>
      </section>

      <section className="products methodology closedSection" id="products">
        <div className="container">
          <h2 id="product">
            Материалы ММАСС
          </h2>
          <Container>
            <TabContainerMMACC>
                <Tab
                active={activeTabMMACC === 'Доклады и сообщения'}
                onClick={() => setActiveTabMMACC('Доклады и сообщения')}
                >
                Доклады и сообщения
                </Tab>
                <Tab
                active={activeTabMMACC === 'Техника'}
                onClick={() => setActiveTabMMACC('Техника')}
                >
                Техника
                </Tab>
                <Tab
                active={activeTabMMACC === 'Закрытый раздел'}
                onClick={() => setActiveTabMMACC('Закрытый раздел')}
                >
                Закрытый раздел
                </Tab>
            </TabContainerMMACC>
          </Container>
          <AnimatePresence mode="wait">
            {activeTabMMACC === 'Доклады и сообщения' && (
              <motion.div
                key="Апокрифы"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CustomSliderMMACCReports />
              </motion.div>
            )}
            {activeTabMMACC === 'Техника' && (
              <motion.div
                key="Интерпретации"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CustomSliderMMACC/>
              </motion.div>
            )}
            {activeTabMMACC === 'Закрытый раздел' && (
              <motion.div
                key="Закрытый раздел"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <CustomSliderСlosedSection/>
                <ContainerForm>
                  <p>Доступ в данный раздел осуществляется по заявке оставьте ваши данные и мы с вами свяжемся</p>
                  <form ref={formRef1} id="contactForm" onSubmit={handleSubmit}>
                    <TabContainerForm>
                        <Input type="text" placeholder="Ф.И.О" name="fullName" required/>
                        <Input type="email" placeholder="Напишите Ваш E-mail"  name="email" required/>
                        <Input type="tel" placeholder="Мобильный телефон" name="phone" required/>
                    </TabContainerForm>
                    <Button>Отправить заявку</Button>
                  </form>
                  {isModalOpen && (
                    <div className="modal-overlays" onClick={closeModal}>
                      <div className="modals" onClick={(e) => e.stopPropagation()}>
                        <div className="modals-contents">
                          <button className="modals-closes" onClick={closeModal}><Image src={closeModalicon} alt="Close" /></button>
                          <div className="modals-icons"><Image src={like} alt="Close" /></div>
                          <div className="modals-messages">Спасибо, Ваша <br /> заявка принята</div>
                        </div>
                      </div>
                  </div>
                  )}
              </ContainerForm>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="products " id="products">
        <div className="container">
        <ContainerEmail>
          <Header>Неизданное</Header>
          <SubHeader>
            Вы можете отметить интересующие Вас тексты и подписаться на наши уведомления, мы сообщим, когда нужные тексты появятся в доступе
          </SubHeader>
          <form ref={formRef2} onSubmit={handleSubmitCheckbox}>
              <Content>
                <Column>
                  <SectionTitle>Готовятся к публикации</SectionTitle>
                  <CheckboxList>
                    {(['item1', 'item2', 'item3'] as ItemKey[]).map((key) => (
                      <CheckboxLabel key={key} isChecked={checkedItems[key]}>
                        <Checkbox
                          type="checkbox"
                          checked={checkedItems[key]}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {itemLabels[key]}
                      </CheckboxLabel>
                    ))}
                  </CheckboxList>
                </Column>
                <Divider />
                <Column>
                  <SectionTitle>Ненаписанные но обозначенные:</SectionTitle>
                  <CheckboxList>
                    {(['item5', 'item6', 'item4' , 'item7' , 'item7'] as ItemKey[]).map((key) => (
                      <CheckboxLabel key={key} isChecked={checkedItems[key]}>
                        <Checkbox
                          type="checkbox"
                          checked={checkedItems[key]}
                          onChange={() => handleCheckboxChange(key)}
                        />
                        {itemLabels[key]}
                      </CheckboxLabel>
                    ))}
                  </CheckboxList>
                </Column>
              </Content>
              <FormContainer>
                  <InputEmail type="email" placeholder="Напишите Ваш E-mail" name="emailChek" />
                  <ButtonEmail type="submit">Подписаться</ButtonEmail>
              </FormContainer>
            </form>
              {isModalOpen && (
              <div className="modal-overlays" onClick={closeModal}>
                <div className="modals" onClick={(e) => e.stopPropagation()}>
                  <div className="modals-contents">
                    <button className="modals-closes" onClick={closeModal}><Image src={closeModalicon} alt="Close" /></button>
                    <div className="modals-icons"><Image src={like} alt="Close" /></div>
                    <div className="modals-messages">Спасибо, Ваша <br /> заявка принята</div>
                  </div>
                </div>
            </div>
            )}
        </ContainerEmail>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container wrap">
          <div className="col">
            <div className="about-image-box">
              <Image
                src="/Author.jpg"
                alt="Author"
                style={{ objectFit: "cover" }}
                sizes="100%"
                fill
              />
            </div>
            <p className="about__text first">
              Сам себя называет МетаПанком - «Мыслителем без границ» («мета/
              метод- путь за пределы» и «панк» - не признающий границ и
              культурной обусловленности).
            </p>
          </div>
          <div className="col">
            <p className="about__text pc_none">Об авторе</p>
            <h2 className="about__heading pc_none">Сергей Попов</h2>
            <p className="about__text">
              Практикующий методолог, президент Международной Методологической
              Ассоциации, отец четверых детей.
              <br />
              <br />
              С 1980 года участвовал в работе Московского Методологического
              кружка под руководством Г.П. Щедровицкого. В 1989 году основал
              «Международную Методологическую Ассоциацию» (ММАСС), действующую и
              поныне.
              <br />
              <br />
              Более 30 лет разрабатывает и внедряет интеллектуальные и
              мыслительные техники, занимается социальной инженерией, автор
              тренингов на постановку мышления.
              <br />
              <br />
              По словам Вячеслава Леонидовича Глазычева, с которым «Попова
              связывал ряд инициатив и проектов, он «демонстрирует невероятную
              смелость мышления»
            </p>
            <p className="about__text second">
              Сам себя называет МетаПанком - «Мыслителем без границ» («мета/
              метод- путь за пределы» и «панк» - не признающий границ и
              культурной обусловленности).
            </p>
          </div>
        </div>
      </section>
      <MotionConfig transition={{ duration: 0.4 }}>
        <AnimatePresence mode="sync">
          {!isHidden && <SendForm />}
          {bookIframe && <BookIframe />}
          {previewIframe && <PreviewIframe />}

          {login && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLogin(false)}
              className="modal"
              id="login"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="modal-content"
              >
                <button
                  onClick={() => setLogin(false)}
                  className="modal-close wrap"
                >
                  &times;
                </button>
                <form>
                  <label htmlFor="login">Логин</label>
                  <input type="text" required id="login" />
                  <label htmlFor="pass">Пароль</label>
                  <input type="password" required id="pass" />
                  <button type="submit" className="btn btn_3">
                    Войти
                  </button>
                </form>
           {/*    <p className="policy">
                  Нажимая на кнопку, Вы соглашаетесь с условиями{" "}
                  <a target="_blank" href="https://arweave.net/ZVmszxUmw-IaKSLRRwhDdMQ8fsjXod55tOCBKoqPAnE">политики конфиденциальности</a>
                </p> */}  
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </>
  );
};

export default Home;
