interface Props {
  title: string;
  content: string;
  thumbnail: string;
  webUrl: string;
}
const News: React.FC<Props> = (props) => {
  const { webUrl, title, content, thumbnail } = props;

  return (
    <a
      href={webUrl}
      target='_blank'
      rel='noreferrer'
      className='flex gap-5 bg-white p-2 border border-gray-200 max-w-3xl justify-between'
    >
      <div className='flex flex-col'>
        <h2 className='font-bold text-lg line-clamp-1'>{title}</h2>
        <p className='line-clamp-4'>{content}</p>
      </div>
      {thumbnail ? (
        <img src={thumbnail} alt='news' className='w-40 h-40' />
      ) : (
        <div className='w-40 h-40 flex-none'></div>
      )}
    </a>
  );
};

export default News;
