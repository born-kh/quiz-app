import { makeAutoObservable } from 'mobx';
import { ICategory, ICategoryItem, IClues, IRating, IStats, StartType } from '../interfaces/quiz';
import { API_BASE_URL, LocalStorage } from '../utils/constants';
import { getRandomQuestions } from '../utils/helpers';

class QuizStore {
  questionStore: QuestionStore;
  quizSettingsStore: QuizSettingsStore;
  constructor() {
    this.questionStore = new QuestionStore(this);
    this.quizSettingsStore = new QuizSettingsStore(this);
  }
}

class QuestionStore {
  rootStore: QuizStore;
  questions: IClues[] = [];
  currentQuestion: IClues | null = null;
  currentQuestionIndex: number = 0;
  answer: string = '';
  constructor(rootStore: QuizStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  setQuestions(questions: IClues[]) {
    this.questions = questions.sort((a, b) => a.value - b.value);
    if (questions.length) this.currentQuestion = this.questions[0];
  }

  setAnswer(answer: string) {
    this.answer = answer;
  }
  finishQuestion() {
    this.answer = '';
    this.currentQuestionIndex = 0;
    this.currentQuestion = null;
    this.rootStore.quizSettingsStore.setRating();
    this.rootStore.quizSettingsStore.clearState();
  }

  nextQuestion() {
    if (this.currentQuestion?.answer.toLowerCase() === this.answer.toLowerCase())
      this.rootStore.quizSettingsStore.score++;

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.finishQuestion();
      return;
    }
    this.answer = '';
    this.currentQuestionIndex++;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
  }
}

class QuizSettingsStore {
  rootStore: QuizStore;
  categories: ICategoryItem[] = [];
  ratings: IRating[] = [];
  stats: IStats[] = [];
  user: string = '';
  score: number = 0;
  category: ICategory | null = null;
  selectedCategoryId: number | null = null;
  isLoading: boolean = false;
  startType: StartType | null = null;

  constructor(rootStore: QuizStore) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
    this.user = localStorage.getItem(LocalStorage.quizAppUser) || '';
    const ratingLocale = localStorage.getItem(LocalStorage.quizAppRating);
    const statsLocale = localStorage.getItem(LocalStorage.quizAppStats);
    this.ratings = ratingLocale ? JSON.parse(ratingLocale) : [];
    this.stats = statsLocale ? JSON.parse(statsLocale) : [];
  }

  setUser(user: string) {
    this.user = user;
    localStorage.setItem(LocalStorage.quizAppUser, user);
  }

  setStartType(type: StartType | null) {
    this.startType = type;
  }
  setCategories(categories: ICategory[]) {
    this.categories = categories;
  }
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  setCategoryId(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }

  setCategory(category: ICategory) {
    this.category = category;
  }

  clearState() {
    this.startType = null;
    this.category = null;
    this.selectedCategoryId = null;
    this.score = 0;
  }

  setRating() {
    const rating = this.ratings.find((rating) => rating.user === this.user);
    if (rating) {
      rating.score = this.score > rating.score ? this.score : rating.score;
    } else {
      this.ratings.push({ user: this.user, score: this.score });
    }

    localStorage.setItem(LocalStorage.quizAppRating, JSON.stringify(this.ratings));

    this.stats.push({
      date: new Date().toISOString(),
      score: this.score,
      category: this.category?.title as string,
      user: this.user,
    });

    localStorage.setItem(LocalStorage.quizAppStats, JSON.stringify(this.stats));
  }

  async fetchCategories() {
    this.setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/categories?count=20&offset=0`);
      let categories = await response.json();
      categories = categories
        .filter((category: ICategoryItem) => category.clues_count > 10)
        .filter((_: unknown, index: number) => index < 10);
      this.setCategories(categories);
    } catch (_) {
    } finally {
      this.setLoading(false);
    }
  }

  async fetchCategory() {
    if (!this.selectedCategoryId) return;
    this.setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/category/?id=${this.selectedCategoryId}`);
      const category: ICategory = await response.json();
      this.setCategory(category);
      const questions = getRandomQuestions(category.clues || [], 10);
      this.rootStore.questionStore.setQuestions(questions);
    } catch (_) {
    } finally {
      this.setLoading(false);
    }
  }
}

export default new QuizStore();
