import classes from '@/components/loader.page.module.css';

export default function LoaderPage() {
  return (
    <div className={classes['loader-page']}>
      <span className={classes.loader}></span>
    </div>
  );
}
