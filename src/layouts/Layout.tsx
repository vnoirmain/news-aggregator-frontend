import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <div className='container'>{children}</div>
    </>
  );
};

export default Layout;
