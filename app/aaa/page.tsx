import CommandsCardPage from "../protected/commands/CommandsCard";
import CommandsListPage from "../protected/commands/CommandsLists";
import GallerysListPage from "../protected/gallerys/GallerysLists";
import NewsListPage from "../protected/news/NewsLists";
import NewslistsListPage from "../protected/newslists/NewslistsLists";
import PostsListPage from "../protected/posts/PostsLists";

export default function Home(){
    return(
        <>
        <GallerysListPage />
        <NewsListPage />
        <NewslistsListPage />
        <PostsListPage />
        <CommandsListPage />
        <CommandsCardPage />
        </>
    )
}