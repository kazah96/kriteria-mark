import React from "react";
import PropTypes from "prop-types";

import {
  DataGrid,
  CriteriaList,
  Normalized,
  Result,
  Blurable,
} from "components";

import style from "./style";

class App extends React.Component {
  state = { offsetY: 0 };

  static propTypes = { clearAll: PropTypes.func.isRequired };

  static defaultProps = {};

  componentWillMount() {}

  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.setState({ offsetY: window.pageYOffset });
  };

  beginAgain = () => {
    const { clearAll } = this.props;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <div className={style.app}>
        <div className={style.header}>
          <div className={style.headerLogo}>
            Оценка методом аддитивной свертки критериев
          </div>
        </div>
        <div className={style.pageWrapper}>
          <Blurable offsetY={this.state.offsetY}>
            <div className={style.section}>
              <h4>1. Определение критериев. </h4>

              <div className={style.pageContent}>
                <p className={style.helper}>
                  Так как в критерии имеют различную значимость, то для начала
                  необходимо построить таблицу важности критериев. Для начала
                  критерии необходимо ввести и расположить в порядке по
                  убыванию. Вес критериев необходимо подобрать таким образом,
                  чтобы сумма рав-нялась единице. Полученные баллы делим на (1 +
                  2 + ... + n) - чтобы сумма весов была равна единице
                </p>
                <CriteriaList />
              </div>
            </div>
            <div className={style.section}>
              <h4>2. Определение параметров. </h4>
              <div className={style.pageContent}>
                <p className={style.helper}>
                  Группа для сравнения по выбранным выше критериям, нужно
                  заполнить параметрами
                </p>
                <DataGrid key="dataGrid" />
              </div>
            </div>
            <div className={style.section}>
              <h4>3. Нормализация параметров. </h4>
              <div className={style.pageContent}>
                <p className={style.helper}>
                  Для сравнения критериев их необходимо нормировать по столбцам.
                  Для этого использован метод аддитивной свертки.
                </p>
                <Normalized />
              </div>
            </div>
            <div className={style.section}>
              <h4>3. Расчёт оценки. </h4>

              <div className={style.pageContent}>
                <p className={style.helper}>
                  Метод свертывания критериев предполагает преобразование набора
                  имеющихся частных критериев в один суперкритерий:
                  F=φ(f_1,f_2,f_3,…,f_n ), (4) Т.е. мы получаем новый
                  суперкритерий F, который является функцией φ от частных
                  критериев. Аддитивную свертку критериев можно рассматривать
                  как реализацию принципа справедливой компенсации абсолютных
                  значений нормированных частных критериев.
                </p>

                <Result />
              </div>
            </div>
            <div onClick={this.beginAgain} className={style.beginAgain}>
              Наверх
            </div>
          </Blurable>
        </div>
        <div className={style.footer}>2018 Декабрь</div>
      </div>
    );
  }
}

export default App;
