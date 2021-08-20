import "./entity-list-virtual.scss";

// React
import { useEffect, useState } from "react";

// Virtual List React Component
import { Virtuoso } from "react-virtuoso";

// Typescript DataProps type
import { DataProps } from "../layout/layout-grid";

// React Router
import { useLocation } from "react-router-dom";

type ListVirtualProps = {} & DataProps;

const ListVirtual = ({ selectedData }: ListVirtualProps) => {
  let url = useLocation();
  const [items, setItems] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      if (selectedData) {
        fetch(`${url.pathname}/${selectedData.photo}_comments.json`)
          .then((resp) => resp.json())
          .then((d) => {
            setItems([...d]);
          });
      }
    };
    getData();
  }, [selectedData]);

  const itemClick = (username: string) => {
    window.open("https://instagram.com/" + username, "_blank");
  };

  return items.length ? (
    <div className="entity-list-virtual">
      <Virtuoso
        style={{ height: "100%", width: "100%" }}
        data={items}
        itemContent={(idx, comment) => (
          <div className="list-virtual-item">
            {/*
            <img
              //src={sitems[index].owner.profile_pic_url + ".jpeg"
              src=""
            />
            */}
            <span
              className="comment-username"
              onClick={() => itemClick(comment.owner.username)}
            >
              {`${comment.owner.username}:`}
            </span>
            <span className="comment-text">{comment.text}</span>
          </div>
        )}
      />
    </div>
  ) : (
    <span>loading</span>
  );
};

export default ListVirtual;
