import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { selectGenreListId } from "../redux/features/playerSlice";
import { useGetSongsByGenreQuery } from "../redux/services/coreServices";
import { genres } from "../assets/constants";

const Discover = () => {
  // useDispatch dùng để thực hiện action làm thay đôi state hoặc gọi api
  const dispatch = useDispatch();
  // useSelector láy state từ store, và kiểm tra tham chiếu liên tục giữa state của components với store
  // nếu có sự khác biệt của state do dispatch 1 action thì components reRender, và state mới được đồng bộ với store
  // ở đây là lấy state của slice player
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  // hook lấy từ coreServices, chạy API lấy bài hát theo thể loại
  // có 3 giá trị: data chứa dữ liệu trả về, isFetching và Error chứa trạng thái đang chờ response và lỗi của API
  // tham số nhận vào cho API này là thể loại, lấy ở state, hoặc mặc định là POP
  const { data, isFetching, error } = useGetSongsByGenreQuery(
    genreListId || "POP"
  );
  // nếu api gửi có trạng thái feching thì render ra cái component Loader
  if (isFetching) return <Loader title="Loading songs..." />;
  // nếu lỗi thì render ra cái component Lỗi
  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
  // map thể loại chọn với danh sách kết quả trả về api đổ ra dưới dạng các component SongCard
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-green-500 text-white p-2 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
