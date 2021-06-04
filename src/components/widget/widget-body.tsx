import "./widget-body.scss";

type WidgetBodyProps = {
  children: React.ReactNode;
};

const WidgetBody = ({ children }: WidgetBodyProps) => {
  return (
    <div className="widget-body" onMouseDown={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

export default WidgetBody;
