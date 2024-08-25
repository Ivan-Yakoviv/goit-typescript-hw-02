import s from './SearchBar.module.css';
import toast from "react-hot-toast";
import { PiListMagnifyingGlassLight } from "react-icons/pi";



const SearchBar = ({onSearch}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
      const inputValue = form.elements.search.value.trim();
    if (inputValue === "") {
        toast.error("Please enter a search term");
			return;
		}
    onSearch(inputValue);
    form.reset();
  };

  return (
    <header className={s.header}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos" />
        <button type='submit' className={s.btn}><PiListMagnifyingGlassLight size={26}/></button>
      </form>
    </header>
  );
}

export default SearchBar
